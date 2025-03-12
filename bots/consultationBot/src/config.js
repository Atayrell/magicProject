const path = require("path");
const svetlana = path.join(__dirname, "../assets/img/svetlanaPhoto.webp");
const dmitry = path.join(__dirname, "../assets/img/dmitryPhoto.jpg");
const daria = path.join(__dirname, "../assets/img/dariaPhoto.png");
require("dotenv").config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  MANAGER_LINK: "https://t.me/@Dmitry_Astap",
  experts: {
    svetla: {
      photo: svetlana,
      name: "Светлана",
      cost: "📅 1 месяц – 25$\n📅 3 месяца – 20$ (60$)\n📅 6 месяцев – 15$ (90$)",
      description: "Описание эксперта Светлы...",
      website: "https://yourwebsite.com/svetla",
    },
    darya: {
      photo: daria,
      name: "Дарья",
      cost: "📅 1 месяц – 25$\n📅 3 месяца – 20$ (60$)\n📅 6 месяцев – 15$ (90$)",
      description: "Описание эксперта Дарьи...",
      website: "https://yourwebsite.com/darya",
    },
    dmitry: {
      photo: dmitry,
      name: "Дмитрий",
      cost: "📅 1 месяц – 25$\n📅 3 месяца – 20$ (60$)\n📅 6 месяцев – 15$ (90$)",
      description: "Описание эксперта Дмитрия...",
      website: "https://yourwebsite.com/dmitry",
    },
  },
};
