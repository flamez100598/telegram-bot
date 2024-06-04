const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

// Thay YOUR_API_TOKEN bằng token của bạn từ BotFather\
const token = process.env.API_TOKEN_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });

// Các lệnh và phản hồi tương ứng
const responses = {
    help: 'Hướng dẫn đăng ký tài khoản, KYC...',
    socials: 'Danh sách các MXH chính thức của Athene Network:\n- Facebook: https://facebook.com/athenenetwork\n- Twitter: https://twitter.com/athenenetwork\n- LinkedIn: https://linkedin.com/company/athenenetwork',
    about: 'Giới thiệu về Athene Network, mục tiêu, sứ mệnh: https://athene.network',
    start: 'Mở WebApp: https://athene.network'
};


// Khởi tạo các button cho keyboard
const keyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Help', callback_data: 'help' }],
            [{ text: 'Socials', callback_data: 'socials' }],
            [{ text: 'About', callback_data: 'about' }],
            [{ text: 'Start App', callback_data: 'start' }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

const opts = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Lauch App',
            web_app: { url: 'https://0d1c-123-25-5-75.ngrok-free.app' }
        }],
        ],
    }
};

// Xử lý lệnh /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to athene mining minapp!!', keyboard);
    bot.sendMessage(chatId, 'Chọn một tùy chọn từ inline keyboard:', opts);
});

// Xử lý các callback từ button inline
bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;

    bot.sendMessage(msg.chat.id, responses[data]);
});

// Xử lý các lệnh
bot.onText(/Help/, (msg) => {
    bot.sendMessage(msg.chat.id, responses.help);
});

bot.onText(/Socials/, (msg) => {
    bot.sendMessage(msg.chat.id, responses.socials);
});

bot.onText(/About/, (msg) => {
    bot.sendMessage(msg.chat.id, responses.about);
});

bot.onText(/Start App/, (msg) => {
    bot.sendMessage(msg.chat.id, responses.about);
});


