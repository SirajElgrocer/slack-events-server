const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming JSON requests
app.use(bodyParser.json());

// Replace this with the actual channel ID for #hourly-heartbeat
const HEARTBEAT_CHANNEL_ID = 'C1234567890';

app.post('/slack/events', (req, res) => {
  const body = req.body;
  
  // Log the entire payload for debugging
  console.log('Received Slack event:', JSON.stringify(body, null, 2));
  
  if (body.type === 'url_verification') {
    // Echo back the challenge token
    return res.status(200).send({ challenge: body.challenge });
  }
  
  if (body.type === 'event_callback') {
    const event = body.event;
    // Log the event type
    console.log('Event type:', event.type);

    if (event && event.type === 'message') {
      // Log all message events
      console.log('Message event detected:', event.text);

      // Check if the message is from the #hourly-heartbeat channel
      if (event.channel === HEARTBEAT_CHANNEL_ID) {
        console.log('New message in #hourly-heartbeat:', event.text);
      }
    }
  }

  // Always respond with 200 OK to acknowledge receipt
  return res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Slack events server listening on port ${PORT}`);
});
