# Telemetree Sample Bot Implementation

This is a sample Telegram bot implementation that demonstrates how to use the Telemetree tracking library.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` and add your:
   - Telegram Bot Token (from @BotFather)
   - Telemetree API Key
   - Telemetree Public Key

## Running the Bot

Start the bot with:
```bash
npm start
```

## Features

- Automatically tracks message events
- Custom event tracking for /start command
- Basic command handling (/start, /help)
- Environment-based configuration

## Telemetree Integration

This sample demonstrates:
- Automatic event tracking
- Custom event tracking
- Configuration management
- Secure event encryption
