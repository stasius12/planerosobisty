const { sendEmailToAdmins } = require('../../utils/emails')

module.exports.sendEmailToAdmins = async (req, res) => {
  const { subject, text } = req.body
  await sendEmailToAdmins(subject, text)

  res.sendStatus(200)
}
