# Telemetree NodeJS SDK Tutorial

This repository demonstrates how to integrate the Telemetree tracking SDK into a NodeJS application using a Telegram bot as an example.

## What is Telemetree?

Telemetree is a privacy-first analytics platform that helps you track user interactions while ensuring data security through end-to-end encryption.

## Prerequisites

Before starting, you'll need:
- Node.js 14 or higher
- A Telegram bot token (get it from [@BotFather](https://t.me/botfather))
- Telemetree credentials (API Key and Public Key from [Telemetree Dashboard](https://app.telemetree.com))

## Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/telemetree-nodejs-example.git
   cd telemetree-nodejs-example
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
   TELEMETREE_PUBLIC_KEY=your_public_key
   ```

## SDK Integration Guide

### 1. Initialize Telemetree Client

```javascript
const { TelemetreeClient } = require('@telemetree/sdk');

const telemetree = new TelemetreeClient({
  apiKey: process.env.TELEMETREE_API_KEY,
  publicKey: process.env.TELEMETREE_PUBLIC_KEY
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

## Support

For more information about Telemetree SDK:
- [Official Documentation](https://docs.telemetree.com)
- [API Reference](https://docs.telemetree.com/api)
- [Support Portal](https://support.telemetree.com)
