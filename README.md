# Slack Events Forwarder

This Node.js/Express application sets up a Slack Event Subscriptions endpoint. When it receives message events from a specified Slack channel (`#hourly-heartbeat`), it forwards the entire event payload to a configured external webhook URL.

## Features

- **Slack Event Subscription:**  
  Responds to Slack’s URL verification challenge to enable event subscriptions.
  
- **Message Handling:**  
  Listens for `message` events from Slack. Filters out events that are not from the specified channel.
  
- **Forwarding Events:**  
  On detecting a new message in the configured channel, the app sends the event payload (JSON) to the provided webhook URL.

## Prerequisites

- **Node.js:**  
  Make sure you have [Node.js](https://nodejs.org/) installed (v14+ recommended; v18+ if you want to use the built-in `fetch` API without additional libraries).
  
- **Slack App & Tokens:**  
  - A Slack App created at https://slack-events-server.onrender.com/slack/events.
  - The app must have event subscriptions enabled and be subscribed to `message.channels`.  
  - The bot user must be invited to the `#hourly-heartbeat` channel.  
  - The Slack app must be installed to the workspace with necessary scopes (e.g., `channels:history`, `channels:read`).

- **Channel ID:**  
  You’ll need the Slack channel ID for `#hourly-heartbeat`:
  1. Open the channel details in Slack.
  2. Or use [conversations.list](https://api.slack.com/methods/conversations.list) with a test token to find the channel’s ID.

- **Webhook URL:**  
  A publicly accessible webhook endpoint that accepts JSON POST requests without authentication.

## Configuration

In `server.js`, update the following variables:

- `HEARTBEAT_CHANNEL_ID`: Set this to the channel ID of `#hourly-heartbeat`.
- `WEBHOOK_URL`: Replace with your actual target webhook URL.

Example:
```js
const HEARTBEAT_CHANNEL_ID = 'C1234567890'; // replace with your channel ID
const WEBHOOK_URL = 'https://example.com/webhook'; // replace with your webhook
