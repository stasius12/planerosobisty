const express = require('express');
const Mailchimp = require('mailchimp-api-v3');
const serverless = require('serverless-http');

const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = '01d3f8d745';
const mailchimp = new Mailchimp(apiKey);

const app = express()
app.use(express.json())
const router = express.Router();

router.post('/', async(req, res) => {
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

app.use('/.netlify/functions/mailchimp-subscribe', router);

module.exports = app;
module.exports.handler = serverless(app);
