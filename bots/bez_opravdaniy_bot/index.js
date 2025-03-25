const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const groupChatId = process.env.GROUP_CHAT_ID; // ID группы, куда нужно отправить комментарий

const bot = new TelegramBot(token, { polling: true });

// Обработка новых сообщений в канале
bot.on("channel_post", (msg) => {
  // Здесь можно добавить любую логику, например, фильтрацию по содержимому
  console.log(msg.migrate_to_chat_id);
  console.log(msg);
  bot.sendMessage(
    groupChatId,
    `Вышел новый пост. Жду Вашу реакцию и комментарии 🔥🔥
[Перейти к посту](https://t.me/Without_excusess/${msg.message_id})`,
    {
      parse_mode: "Markdown",
    }
  );
});

console.log("🚀 Бот запущен!");
