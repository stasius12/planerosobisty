const SibApiV3Sdk = require('sib-api-v3-sdk')
const { initSentry } = require('../utils/sentry')
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  process.env.SENDINBLUE_API_KEY

const Sentry = initSentry()

const DEFAULT_SENDER_EMAIL = 'sklep@planerosobisty.pl'
const DEFAULT_SENDER_NAME = 'Planer Osobisty'

const sendEmail = async (to, subject, text, html = null, sender = null) => {
  /*
  :param to (required) - either string with valid email address or list of email objects
    e.g. [ { email: 'email1@com.pl' }, { email: 'email2@com.pl' } ]
  :param subject (required) - string
  :param text (required) - alternative text
  :param html (optional) - HTML content, if set text won't be used as content
  :param sender (optional) - object { email: 'email1@com.pl', name: 'name' }, by default DEFAULT_SENDER_* is used
   */

  const toParsed = typeof to === 'string' ? [{ email: to }] : to
  const toAsStr = toParsed.map((obj) => obj.email).join(', ')

  try {
    const senderParsed =
      sender !== null
        ? sender
        : { email: DEFAULT_SENDER_EMAIL, name: DEFAULT_SENDER_NAME }

    const extra = html ? { htmlContent: html } : { textContent: text }

    const data =
      await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
        subject,
        sender: senderParsed,
        replyTo: senderParsed,
        to: toParsed,
        params: { bodyMessage: text },
        ...extra,
      })

    Sentry.captureMessage(
      `Email has been sent to: ${toAsStr} with subject: ${subject}`,
      { extra: data }
    )
  } catch (error) {
    Sentry.captureException(error, {
      extra: {
        description: `Tried to send an email to: ${toAsStr} with subject: ${subject}`,
      },
    })
  }
}

const sendEmailToAdmins = async (subject, text) => {
  return await sendEmail(
    [
      { email: 'stanislawstepak@outlook.com' },
      { email: 'wlodarskanatalia@gmail.com' },
    ],
    subject,
    text,
    null,
    { email: 'admin@planerosobisty.pl', name: 'Admin from Planer Osobisty' }
  )
}

module.exports.sendEmail = sendEmail
module.exports.sendEmailToAdmins = sendEmailToAdmins
