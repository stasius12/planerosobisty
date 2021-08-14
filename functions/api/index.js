import express from 'express'
import Mailchimp from 'mailchimp-api-v3'
import serverless from 'serverless-http';

const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = '01d3f8d745';
const mailchimp = new Mailchimp(apiKey);

const app = express()
app.use(express.json())

app.post('/subscribe', async(req, res) => {
  const { email: email_address } = req.body;
  try{
    const response = await mailchimp.request({
      method: 'post',
      path: `/lists/${audienceId}/members`,
      body: {
        email_address,
        status: "subscribed"
      }
    });
    const { _links, ...result } = response;
    res.status(result.statusCode).json(result);
  } catch(err) {
    res.status(err.status).send(err);
  }
})

export default {
  path: '/api',
  handler: serverless(app)
}
