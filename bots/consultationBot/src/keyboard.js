const { experts, MANAGER_LINK } = require("./config");

const getExpertsKeyboard = () => ({
  inline_keyboard: Object.keys(experts).map((key) => [
    { text: experts[key].name, callback_data: `expert_${key}` },
  ]),
});

const getExpertOptionsKeyboard = (expertKey) => ({
  inline_keyboard: [
    [
      { text: "💰 Узнать стоимость", callback_data: `cost_${expertKey}` },
      { text: "ℹ️ Описание", callback_data: `desc_${expertKey}` },
    ],
    [{ text: "🔗 Ссылки на сайт", callback_data: `site_${expertKey}` }],
    [{ text: "👨‍💼 Связь с менеджером", url: MANAGER_LINK }],
    [{ text: "⬅️ Назад", callback_data: "back" }],
  ],
});

module.exports = { getExpertsKeyboard, getExpertOptionsKeyboard };
