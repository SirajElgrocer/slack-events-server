const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming JSON requests
app.use(bodyParser.json());

// The Slack Events endpoint
app.post('/slack/events', (req, res) => {
  const body = req.body;
  
  if (body.type === 'url_verification') {
    // This is the Slack challenge request
    // Slack sends you a 'challenge' param in the request body that you must echo back
    return res.status(200).send({ challenge: body.challenge });
  }

  // For other events, just respond with 'OK'
  // You can add event handling logic here later
  return res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Slack events server listening on port ${PORT}`);
});
