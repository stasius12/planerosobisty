const Sentry = require('@sentry/node')
const { ExtraErrorData } = require('@sentry/integrations')

const getEnvironment = () => {
  // It can be production, deploy-preview, branch-deploy or dev
  if (process.env.CONTEXT === 'branch-deploy') {
    return process.env.BRANCH
  }

  return process.env.CONTEXT
}

function initSentry() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: getEnvironment(),
      release: process.env.SENTRY_RELEASE,
      normalizeDepth: 11,
      integrations: [new ExtraErrorData({ depth: 10 })],
    })
    return Sentry
  }
  return null
}

async function reportError(error) {
  // eslint-disable-next-line no-console
  // console.warn(error)
  const _Sentry = initSentry()

  if (_Sentry === null) return

  let eventID = null
  if (typeof error === 'string') {
    eventID = _Sentry.captureMessage(error)
  } else {
    eventID = _Sentry.captureException(error)
  }

  await _Sentry.flush()

  return eventID
}

function catchErrors(handler) {
  return async function (event, context) {
    context.callbackWaitsForEmptyEventLoop = false
    try {
      return await handler.call(this, ...arguments)
    } catch (e) {
      const eventId = await reportError(e)
      return {
        statusCode: 500,
        body: `[${eventId}] Error: ${e}`,
      }
    }
  }
}

function catchExpressEndpointErrors(handler) {
  return async function (req, res) {
    try {
      return await handler.call(this, ...arguments)
    } catch (e) {
      const eventId = await reportError(e)
      const requestId = Object.getOwnPropertyNames(e).includes('requestId')
        ? e.requestId
        : null
      res.status(500).json({ eventId, requestId })
    }
  }
}

module.exports.initSentry = initSentry
module.exports.catchErrors = catchErrors
module.exports.catchExpressEndpointErrors = catchExpressEndpointErrors
