const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config(); // Загружаем переменные из .env

const token = process.env.BOT_TOKEN; // Загружаем токен из переменных окружения
const chatId = process.env.MEDITATION_CHAT_ID; // Загружаем chat_id канала

const bot = new TelegramBot(token, { polling: true });

// Ссылки на каналы
const channels = {
  meditations: "https://t.me/+tnqsDWWXLKQzODFi",
  live_streams: "https://t.me/+Rz1RMa-Z_7szY2Vi",
  experts: "https://t.me/+WrzlnTrHttAzNjgy",
  newbie: "https://t.me/+ocGHC-M2IbQ5ZWRi",
  metaphysics: "https://t.me/+ZbACe8DwhK45YTNi",
  lectures: "https://t.me/+nqRkShLd9HZiNjYy",
  ask_question: "@magicOfDay_bot",
  chat: "https://t.me/+2UPdQu4PK302YTAy",
  tarot: "https://t.me/+JVANRhwo2tY5Njhi",
};

// Функция отправки поста с кнопками
async function sendPost() {
  await bot.sendMessage(chatId, "📌 Выберите категорию:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🧘‍♂️ Медитации", url: channels.meditations },
          { text: "📺 Прямые эфиры", url: channels.live_streams },
        ],
        [
          {
            text: "👨‍🏫 Консультации у экспертов",
            url: "https://t.me/Consult_magic_bot",
          },
        ],
        [{ text: "🆕 Новичку", url: channels.newbie }],
        [{ text: "🌌 Тело и метофизика", url: channels.metaphysics }],
        [{ text: "📚 Лекции", url: channels.lectures }],
        [{ text: "❓ Задать вопрос", url: "https://t.me/magicOfDay_bot" }],
        [{ text: "💬 Общий чат", url: channels.chat }],
        [{ text: "🔮 Таро и нумерология", url: channels.tarot }],
      ],
    },
  });

  console.log("✅ Пост с кнопками отправлен!");
}

// Отправить пост при запуске
sendPost();
