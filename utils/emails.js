const SibApiV3Sdk = require('sib-api-v3-sdk')
const { initSentry } = require('../utils/sentry')
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  process.env.SENDINBLUE_API_KEY

const Sentry = initSentry()

const DEFAULT_SENDER_EMAIL = 'sklep@planerosobisty.pl'
const DEFAULT_SENDER_NAME = 'Planer Osobisty'

const sendEmail = (to, subject, text, html, sender = null) => {
  try {
    const senderParsed =
      sender !== null
        ? sender
        : { email: DEFAULT_SENDER_EMAIL, name: DEFAULT_SENDER_NAME }
    const toParsed = typeof to === 'string' ? [{ email: to }] : to

    const extra = html ? { htmlContent: html } : { textContent: text }

    const data = new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      subject,
      sender: senderParsed,
      replyTo: senderParsed,
      to: toParsed,
      params: { bodyMessage: text },
      ...extra,
    })

    Sentry.captureMessage(
      `Email has been sent to: ${to} with subject: ${subject}`,  // TODO: wrong parsing
      { extra: data }
    )
  } catch (error) {
    Sentry.captureException(error, {
      extra: {
        description: `Tried to send an email to: ${to} with subject: ${subject}`,
      },
    })
  }
}

const sendEmailToAdmins = (subject, text) => {
  return sendEmail(
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
