const Mailchimp = require('mailchimp-api-v3')

const apiKey = process.env.MAILCHIMP_API_KEY
const audienceId = '01d3f8d745'
const mailchimp = new Mailchimp(apiKey)

const subscribe = async (req, res) => {
  const { email: emailAddress } = req.body
  try {
    const response = await mailchimp.request({
      method: 'post',
      path: `/lists/${audienceId}/members`,
      body: {
        emailAddress,
        status: 'subscribed',
      },
    })
    const { _links, ...result } = response
    res.status(result.statusCode).json(result)
  } catch (err) {
    res.status(err.status).send(err)
  }
}

module.exports.subscribe = subscribe
