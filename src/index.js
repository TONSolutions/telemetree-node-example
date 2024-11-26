require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { TelemetreeClient } = require("@tonsolutions/telemetree-node");
require("dotenv").config();

let telemetree = null;
let bot = null;

// Wrap the entire initialization and setup in an async IIFE
(async () => {
  console.log("Starting Telemetree and bot initialization...");

  try {
    // Initialize Telemetree client
    telemetree = new TelemetreeClient(
      process.env.TELEMETREE_PROJECT_ID,
      process.env.TELEMETREE_API_KEY
    );

    console.log("Initializing Telemetree client...");
    await telemetree.initialize();
    console.log("Telemetree client initialized successfully");

    if (!telemetree.eventBuilder || !telemetree.httpClient) {
      throw new Error("Telemetree services not properly initialized");
    }

    console.log("Initializing Telegram bot...");
    bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

    // Set up bot handlers after initialization
    setupBotHandlers();

    console.log("Bot is running with Telemetree tracking enabled");
  } catch (error) {
    console.error("Failed to initialize services:", error);
    console.error("Error details:", {
      telemetreeInitialized: !!telemetree,
      botInitialized: !!bot,
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
})();

// Define bot handlers
function setupBotHandlers() {
  // Handle /start command
  bot.onText(/\/start/, async msg => {
    try {
      if (!telemetree?.eventBuilder) {
        console.error(
          "Telemetree client or its services not fully initialized"
        );
        return;
      }
      console.log("Processing /start command...");
      console.log("Message details:", {
        messageId: msg.message_id,
        fromUser: msg.from,
        chatId: msg.chat.id,
        text: msg.text
      });
      // Wrap message in proper Telegram update structure
      const update = {
        update_id: Date.now(),
        message: {
          message_id: msg.message_id,
          from: msg.from,
          chat: msg.chat,
          date: Math.floor(Date.now() / 1000),
          text: msg.text
        }
      };

      console.log("Sending tracking request for /start command:", update);
      const trackingResponse = await telemetree.trackUpdate(update);
      console.log("Tracking response received:", {
        status: trackingResponse?.status || "No status received",
        statusCode: trackingResponse?.statusCode,
        success: trackingResponse?.success || false,
        data: trackingResponse?.data || "No data received",
        error: trackingResponse?.error,
        timestamp: new Date().toISOString(),
        requestId: trackingResponse?.requestId || "No request ID",
        processingTime: trackingResponse?.processingTime
      });

      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "Hello! I am ready to help you.");
    } catch (error) {
      console.error("Failed to track /start command:", {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  });

  // Handle all messages
  bot.on("message", async msg => {
    try {
      if (!telemetree?.eventBuilder) {
        console.error(
          "Telemetree client or its services not fully initialized"
        );
        return;
      }
      console.log("Processing message...");
      console.log("Message details:", {
        messageId: msg.message_id,
        fromUser: msg.from,
        chatId: msg.chat.id,
        text: msg.text,
        timestamp: Math.floor(Date.now() / 1000)
      });
      // Wrap message in proper Telegram update structure
      const update = {
        update_id: Date.now(),
        message: {
          message_id: msg.message_id,
          from: msg.from,
          chat: msg.chat,
          date: Math.floor(Date.now() / 1000),
          text: msg.text
        }
      };

      console.log("Sending tracking request for message:", update);
      const trackingResponse = await telemetree.trackUpdate(update);
      console.log("Tracking response received:", {
        status: trackingResponse?.status || "No status received",
        statusCode: trackingResponse?.statusCode,
        success: trackingResponse?.success || false,
        data: trackingResponse?.data || "No data received",
        error: trackingResponse?.error,
        timestamp: new Date().toISOString(),
        requestId: trackingResponse?.requestId || "No request ID",
        processingTime: trackingResponse?.processingTime
      });

      console.log(`Received message from ${msg.from.id}: ${msg.text}`);
    } catch (error) {
      console.error("Failed to track message:", {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  });
}
