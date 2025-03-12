const fs = require("fs");
const { getExpertsKeyboard, getExpertOptionsKeyboard } = require("./keyboard");
const { experts } = require("./config");
const messages = require("./messages");

const setupHandlers = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const placeholderPhoto = fs.createReadStream(
      "../assets/img/dmitryPhoto.jpg"
    );
    await bot.sendPhoto(chatId, placeholderPhoto, {
      caption: messages.startMessage,
      reply_markup: getExpertsKeyboard(),
    });
  });

  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const data = query.data;

    if (data.startsWith("expert_")) {
      const expertKey = data.split("_")[1];
      const expert = experts[expertKey];

      // Отправляем фото эксперта и получаем file_id
      const sentPhotoMsg = await bot.sendPhoto(
        chatId,
        fs.createReadStream(expert.photo)
      );
      const fileId = sentPhotoMsg.photo[0].file_id;

      // Удаляем временное сообщение с фото, чтобы не дублировалось
      await bot.deleteMessage(chatId, sentPhotoMsg.message_id);

      // Создаем объект медиа с потоком файла вместо строки пути
      const media = {
        type: "photo",
        media: fileId,
        caption: `Вы выбрали эксперта *${expert.name}*.\nВыберите действие:`,
        parse_mode: "Markdown",
      };

      await bot.editMessageMedia(media, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: getExpertOptionsKeyboard(expertKey),
      });
    } else if (data.startsWith("cost_")) {
      const expertKey = data.split("_")[1];
      bot.editMessageCaption(`💰 Стоимость: \n${experts[expertKey].cost}`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: getExpertOptionsKeyboard(expertKey),
      });
    } else if (data.startsWith("desc_")) {
      const expertKey = data.split("_")[1];
      bot.editMessageCaption(`ℹ️ Описание: ${experts[expertKey].description}`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: getExpertOptionsKeyboard(expertKey),
      });
    } else if (data.startsWith("site_")) {
      const expertKey = data.split("_")[1];
      bot.editMessageCaption(`🔗 Сайт: ${experts[expertKey].website}`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: getExpertOptionsKeyboard(expertKey),
      });
    } else if (data === "back") {
      bot.editMessageCaption(messages.selectExpert, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: getExpertsKeyboard(),
      });
    }

    bot.answerCallbackQuery(query.id);
  });
};

module.exports = { setupHandlers };
