require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { setupHandlers } = require("./handlers");
const { BOT_TOKEN } = require("./config");

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.setMyCommands([{ command: "/start", description: "Запустить бота" }]);

setupHandlers(bot);

console.log("🚀 Бот запущен!");
