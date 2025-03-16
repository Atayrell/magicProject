require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Ссылка на оплату
const paymentLink = "https://paywall.pw/wvxrz7kjqrxk";

// Главное меню (кнопки)
const mainMenuKeyboard = [
  [{ text: "🔥 Оформить подписку", callback_data: "subscribe" }],
  [{ text: "📚 Информация о подписке", callback_data: "subscribe_inf" }],
  [{ text: `‼️ Правила канала`, callback_data: "channel_laws" }],
  [{ text: "💬 Задать вопрос", callback_data: "faq" }],
];

bot.setMyCommands([{ command: "/start", description: "Запустить бота" }]);

// Функция формирует текст для главного меню
function getMainMenuText(firstName) {
  return `Приветствую, ${firstName}!
Я твой временный куратор. Выбери, что ты хочешь:`;
}

// При получении любого сообщения (в т.ч. /start) отправляем главное меню
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, getMainMenuText(msg.from.first_name), {
    reply_markup: {
      inline_keyboard: mainMenuKeyboard,
    },
  });
});

// Обработка нажатий кнопок (callback_data)
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const action = query.data;

  if (action === "subscribe") {
    // Меняем текст и кнопки того же сообщения
    await bot.editMessageText(
      `Наши подписки:
1️⃣ месяц – 25$,
3️⃣ месяца – 20$ (60$),
6️⃣ месяцев – 15$ (90$)

‼️Подписываясь на наш канал, вы подтверждаете, что прочитали и согласны с правилами канала‼️`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [
            [{ text: "Перейти к подпискам", url: paymentLink }],
            [
              {
                text: "Я оплатил ✅",
                callback_data: "subscribe_inf_&_channel_laws",
              },
            ],
            [{ text: `‼️ Правила канала`, callback_data: "channel_laws" }],
            [{ text: "Назад", callback_data: "back_to_main" }],
          ],
        },
      }
    );
  } else if (action === "subscribe_inf") {
    await bot.editMessageText(
      `Для того чтобы узнать о своих подписках, пожалуйста, перейдите к @Paywall_paybot

📌 Подробная инструкция:
1️⃣ Перейдите к @Paywall_paybot
2️⃣ Запустите бота и выберите пункт меню "Мои подписки"
3️⃣ Выберите канал, на который вы подписались`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [[{ text: "Назад", callback_data: "back_to_main" }]],
        },
      }
    );
  } else if (action === "subscribe_inf_&_channel_laws") {
    await bot.editMessageText(
      `Для того чтобы узнать о своих подписках, пожалуйста, перейдите к @Paywall_paybot

📌 Подробная инструкция:
1️⃣ Перейдите к @Paywall_paybot
2️⃣ Запустите бота и выберите пункт меню "Мои подписки"
3️⃣ Выберите канал, на который вы подписались

‼️ВАЖНО‼️
Не забудьте ознакомиться с правилами канала`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [
            [{ text: "Назад", callback_data: "back_to_main" }],
            [{ text: `‼️ Правила канала`, callback_data: "channel_laws" }],
          ],
        },
      }
    );
  } else if (action === "channel_laws") {
    await bot.editMessageText(
      `ПРАВИЛА НАШЕГО TELEGRAM-КАНАЛА

Для комфортного общения в нашем сообществе просим соблюдать следующие правила:

☠️ Что запрещено

Грубость и неуважение – общение должно быть дружелюбным и конструктивным.
Реклама и ссылки – запрещено рекламировать другие Telegram-каналы, сторонние проекты и размещать ссылки на внешние ресурсы без согласования с администрацией.
Оффтоп – не задавайте вопросы, которые не относятся к теме поста.
Ненужные советы – если вас не просят дать совет, не навязывайте своё мнение.
Перетягивание аудитории – запрещено прямо или нативно вовлекать участников в сторонние проекты, даже без явной рекламы.

✅ Что приветствуется

Поддерживайте посты и комментарии реакциями 👍 – это мотивирует развивать сообщество.
Если заметили нарушение, отметьте модератора или напишите в техподдержку.

🚨 Наказания за нарушение

Первое нарушение – предупреждение.
Второе нарушение – еще одно предупреждение.
Третье нарушение – бан без возможности восстановления.

За грубые нарушения (например, спам, оскорбления) модератор может заблокировать пользователя сразу без объяснения причин.

📌 Обязательная подписка
Для участия в общем чате необходимо быть подписанным на основной канал. Если подписка будет отписана – участник удаляется из чата.`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [[{ text: "Назад", callback_data: "back_to_main" }]],
        },
      }
    );
  } else if (action === "faq") {
    await bot.editMessageText("❓ Часто задаваемые вопросы:", {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: "Как получить подписку?", callback_data: "faq_sub" }],
          [{ text: "Как отменить подписку?", callback_data: "faq_cancel" }],
          [
            {
              text: "Как связаться с поддержкой?",
              callback_data: "faq_support",
            },
          ],
          [{ text: "Назад", callback_data: "back_to_main" }],
        ],
      },
    });
  } else if (action === "faq_sub") {
    await bot.editMessageText(
      "📌 Для получения подписки выберите вариант в меню «Оформить подписку».",
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [[{ text: "Назад", callback_data: "faq" }]],
        },
      }
    );
  } else if (action === "faq_cancel") {
    await bot.editMessageText(
      "📌 Вы можете отменить подписку, связавшись с поддержкой.",
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [[{ text: "Назад", callback_data: "faq" }]],
        },
      }
    );
  } else if (action === "faq_support") {
    await bot.editMessageText("📌 Свяжитесь с поддержкой: @Dmitry_Astap", {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [[{ text: "Назад", callback_data: "faq" }]],
      },
    });
  }

  // Возвращение в главное меню
  else if (action === "back_to_main") {
    await bot.editMessageText(getMainMenuText(query.from.first_name), {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: mainMenuKeyboard,
      },
    });
  }

  // Закрываем "часики" у кнопки
  await bot.answerCallbackQuery(query.id);
});

console.log("🚀 Бот запущен!");
