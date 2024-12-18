const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming JSON requests
app.use(bodyParser.json());

// Replace this with the actual channel ID for #hourly-heartbeat
const HEARTBEAT_CHANNEL_ID = 'C06755BLZ0Q';

// The webhook URL to forward events to
const WEBHOOK_URL = 'https://elgrocer.kissflow.com/integration/2/Ac60TT1CHnSM/webhook/nes5rnyJBQhW4nsnGkOCLIxB3ktch5DG7-tsrlpVYjZ6v5LtSUiJB572jWDeU7njk2o7bTNneQdH5pyJ6zT19g';

app.post('/slack/events', async (req, res) => {
  const body = req.body;

  console.log('Received Slack event:', JSON.stringify(body, null, 2));

  if (body.type === 'url_verification') {
    // Echo back the challenge token
    return res.status(200).send({ challenge: body.challenge });
  }

  if (body.type === 'event_callback') {
    const event = body.event;
    console.log('Event type:', event.type);

    if (event && event.type === 'message') {
      console.log('Message event detected:', event.text);

      // Check if the message is from the #hourly-heartbeat channel
      if (event.channel === HEARTBEAT_CHANNEL_ID) {
        console.log('New message in #hourly-heartbeat:', event.text);

        try {
          // Forward the entire request body as JSON to the given webhook
          const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          if (!response.ok) {
            console.error('Failed to forward event:', response.statusText);
          } else {
            console.log('Event successfully forwarded to the webhook.');
          }
        } catch (error) {
          console.error('Error forwarding event:', error);
        }
      }
    }
  }

  // Always respond 200 OK to Slack to acknowledge receipt
  return res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Slack events server listening on port ${PORT}`);
});
