require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { TelemetreeClient } = require('telemetree');

// Initialize Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Initialize Telemetree client
const telemetree = new TelemetreeClient(
    process.env.TELEMETREE_PROJECT_ID,
    process.env.TELEMETREE_API_KEY
);

// Initialize the client before use
await telemetree.initialize();

// Handle /start command
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Welcome! I am a sample bot that demonstrates Telemetree tracking.');
    
    // Track custom event
    await telemetree.track({
        event_type: 'bot_start',
        chat_id: chatId,
        user_id: msg.from.id
    });
});

// Handle /help command
bot.onText(/\/help/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show this help message');
});

// Handle all messages
bot.on('message', async (msg) => {
    // Telemetree will automatically track this event based on config
    console.log(`Received message from ${msg.from.id}: ${msg.text}`);
});

console.log('Bot is running...');
