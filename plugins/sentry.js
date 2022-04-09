import Vue from 'vue'

import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import { ExtraErrorData } from '@sentry/integrations'

export default ({ app: { router, context } }, inject) => {
  Sentry.init({
    Vue,
    normalizeDepth: 11,
    environment: context.isDev ? 'development' : 'production',
    tracesSampleRate: 1.0,
    dsn: context.$config.sentryDsn,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', /^\//],
      }),
      new ExtraErrorData({ depth: 10 }),
    ],
  })
  inject('sentry', Sentry)
}
