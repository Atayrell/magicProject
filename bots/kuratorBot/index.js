require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

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
    await bot.editMessageText(
      `Выберите способ оплаты:

‼️Внимание: На данный момент, оплата производится только в $ или через платёжную систему paypal
‼️Подписываясь на наш канал, Вы подтверждаете, что прочитали и согласны с правилами канала‼️`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🧾 Международный перевод по реквизитами",
                callback_data: "pay_for_rekviz",
              },
            ],
            [
              {
                text: "🌎 Paypal",
                callback_data: "pay_for_paypal",
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
      `Для того чтобы узнать о своих подписках, пожалуйста, свяжитесь с нашей поддержкой за юзернеймами ниже:

📌 Юзернеймы поддержки:
1️⃣ @Dmitry_Astap
2️⃣ @sviatlanaastapovich`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [[{ text: "Назад", callback_data: "back_to_main" }]],
        },
      }
    );
  } else if (action === "admin_inf") {
    await bot.editMessageText(`Администратор - @Dmitry_Astap 👨🏻`, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [[{ text: "Назад", callback_data: "back_to_main" }]],
      },
    });
  } else if (action === "pay_for_rekviz") {
    await bot.editMessageText(
      `Реквизиты:
💰 долларовый счет 💰

Dzmitry Astapovich

Ast13Up@gmail.com

aleja "Solidarności" 91, 00-144, apartment 15, Warsaw

PL 38 1020 1026 0000 1902 0537 6225

BIC - BPKOPLPW

‼️После оплаты выслать подтверждение администратору. Отвечаем в течении 8 часов‼️`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Я оплатил ✅. Где ваш Админ?",
                callback_data: "admin_inf",
              },
            ],
            [{ text: `‼️ Правила канала`, callback_data: "channel_laws" }],
            [{ text: "Назад", callback_data: "back_to_main" }],
          ],
        },
      }
    );
  } else if (action === "pay_for_paypal") {
    await bot.editMessageText(
      `Почта для оплаты: ast13Up@gmail.com
      
‼️После оплаты выслать подтверждение администратору. Отвечаем в течении 8 часов‼️`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Я оплатил ✅",
                callback_data: "admin_inf",
              },
            ],
            [{ text: "Назад", callback_data: "back_to_main" }],
          ],
        },
      }
    );
  } else if (action === "channel_laws") {
    await bot.editMessageText(
      `ПРАВИЛА TELEGRAM-КАНАЛА

Для комфортного и продуктивного общения в нашем сообществе просим соблюдать следующие правила:

🚫 Запрещено:

Грубость и неуважение – соблюдайте дружелюбный и конструктивный тон.

Реклама и ссылки – запрещено размещать рекламу, ссылки на сторонние ресурсы и проекты без согласования с администрацией.

Оффтоп – пишите по теме, избегайте несвязанных вопросов и обсуждений.

Ненужные советы – не давайте советы, если вас об этом не просили.

Перетягивание аудитории – запрещено вовлекать участников в сторонние проекты, даже нативно.

Массовые рассылки – запрещено отправлять личные сообщения участникам без их согласия.

Организация сторонних чатов и мероприятий с участниками без согласования с администрацией.

✅ Приветствуется:

Поддержка контента – ставьте реакции 👍 к постам и комментариям, чтобы мотивировать развитие сообщества.

Сообщение о нарушениях – если заметили нарушение, отметьте модератора или сообщите в техподдержку.

🚨 Наказания за нарушение:

Первое нарушение – предупреждение.

Второе нарушение – повторное предупреждение.

Третье нарушение – бан, возврат в канал только с оформлением новой подписки.  

⚠️ За серьезные нарушения (спам, оскорбления) модератор может заблокировать пользователя сразу, без объяснения причин.

Спасибо за соблюдение правил! Желаем приятного общения! 😊`,
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
          [{ text: "Как работает оплата?", callback_data: "faq_payment" }],
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
      `📌 Вы можете отменить подписку, связавшись с поддержкой.
      
🚨 Отменив подписку, вы будете удалены из канала`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [[{ text: "Назад", callback_data: "faq" }]],
        },
      }
    );
  } else if (action === "faq_payment") {
    await bot.editMessageText(
      `📌 Выбирая подписку "1️⃣ месяц – 25$" оплата производится каждый месяц по 25$
Выбирая подписку "3️⃣ месяца – 70$" оплата производится каждые 3 месяца по 70$
Выбирая подписку "6️⃣ месяцев – 140$" оплата производится каждые полгода по 140$`,
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
