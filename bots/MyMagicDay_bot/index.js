const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const groupChatId = process.env.GROUP_CHAT_ID; // ID группы, куда нужно отправить комментарий

const bot = new TelegramBot(token, { polling: true });

// Обработка новых сообщений в канале
bot.on("channel_post", (msg) => {
  // Здесь можно добавить любую логику, например, фильтрацию по содержимому
  bot.sendMessage(
    groupChatId,
    `На нашем канале вышел новый пост! Не забудьте просмотреть и оставить свою реакцию 😊`
  );
});

console.log("🚀 Бот запущен!");
