# Telemetree NodeJS SDK Tutorial

This repository demonstrates how to integrate the Telemetree tracking SDK into a NodeJS application using a Telegram bot as an example.

## What is Telemetree?

Telemetree is a comprehensive free analytics tool designed specifically for Telegram Mini Apps. With our SDKs, developers, marketers, and product managers can easily track and optimize user engagement, making data-driven decisions to boost user acquisition and retention. Telemetree simplifies Analytics for Telegram Mini Apps by delivering insights into user behaviors, acquisition channels, and in-app interactions.

## Resources
Consider visiting our resources for more info about the state of the Telegram Mini Apps ecosystem and Telegram analytics.

- [Website](https://www.telemetree.io/)
- [Twitter](https://x.com/telemetree_HQ)
- [Telegram channel](https://t.me/telemetree_en)
- [LinkedIn](https://linkedin.com/company/telemetree)
- [Medium](https://medium.com/@telemetree)
- [Documentation](https://docs.telemetree.io/)

## Prerequisites

Before starting, you'll need:
- Node.js 14 or higher
- A Telegram bot token (get it from [@BotFather](https://t.me/botfather))
- Telemetree credentials (API Key and Public Key from [Telemetree Dashboard](https://app.telemetree.com))

## Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/Telemetree/telemetree-node-example.git
   cd telemetree-node-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your credentials:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEMETREE_API_KEY=your_api_key
   TELEMETREE_PROJECT_ID=your_project_id
   ```

## SDK Integration Guide

### 1. Initialize Telemetree Client

```javascript
const { TelemetreeClient } = require('@tonsolutions/telemetree-node');

const telemetree = new TelemetreeClient({
  apiKey: process.env.TELEMETREE_API_KEY,
  publicKey: process.env.TELEMETREE_PROJECT_ID,
});

await telemetree.initialize();
```

### 2. Track Custom Events

```javascript
// Basic event tracking
await telemetree.track({
  event: 'bot_started',
  properties: {
    user_id: msg.from.id,
    username: msg.from.username
  }
});

// Event with custom metadata
await telemetree.track({
  event: 'command_executed',
  properties: {
    command: '/start',
    chat_type: msg.chat.type
  },
  metadata: {
    timestamp: new Date().toISOString()
  }
});
```

### 3. Error Handling

```javascript
try {
  await telemetree.track({
    event: 'user_action',
    properties: { /* ... */ }
  });
} catch (error) {
  console.error('Failed to track event:', error);
}
```

## Best Practices

1. **Initialization Check**
   Always verify that the Telemetree client is properly initialized before tracking events:
   ```javascript
   if (!telemetree?.eventBuilder) {
     console.error("Telemetree client not initialized");
     return;
   }
   ```

2. **Event Properties**
   - Keep property names consistent across events
   - Use snake_case for property names
   - Include relevant context in each event

3. **Error Handling**
   - Implement proper error handling for all tracking calls
   - Log tracking failures for debugging
   - Consider implementing retry logic for failed events

## Example Features

This sample bot demonstrates:
- Automatic event tracking for message handling
- Custom event tracking for command execution
- Proper error handling and initialization checks
- Environment-based configuration
- Secure event encryption

## Running the Bot

Start the bot with:
```bash
npm start
```

## Advanced Topics

### Custom Event Builder

You can create a custom event builder for consistent event tracking:

```javascript
const createEvent = (name, userId, additionalProps = {}) => ({
  event: name,
  properties: {
    user_id: userId,
    ...additionalProps
  },
  metadata: {
    timestamp: new Date().toISOString()
  }
});
```

### Batch Event Tracking

For multiple events, use batch tracking:

```javascript
await telemetree.trackBatch([
  createEvent('event1', userId),
  createEvent('event2', userId)
]);
```

## Other SDKs
Telemetree SDKs are available for various frameworks and environments, making it easy to incorporate powerful analytics into any Telegram Mini App.
- React SDK: https://github.com/Telemetree/telemetree-react
- Javascript integration: https://github.com/Telemetree/telemetree-pixel
- Python SDK: https://github.com/Telemetree/telemetree-python
- .NET SDK: https://github.com/MANABbl4/Telemetree.Net (community-supported)
