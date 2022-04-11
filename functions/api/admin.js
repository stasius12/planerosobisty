const { sendEmailToAdmins } = require('../../utils/emails')

module.exports.sendEmailToAdmins = (req, res) => {
  const { subject, text } = req.body
  sendEmailToAdmins(subject, text)

  res.sendStatus(200)
}
