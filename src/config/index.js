require('dotenv').config();

const config = {
    authTokenSecret: process.env.AUTH_TOKEN_SECRET,
    port: process.env.PORT || 4000,
    nameApp: process.env.APP,
    mongodb: process.env.MONGO_URI,
    frontendUrl: process.env.FRONTEND_URL,
    baseUrl: process.env.HOSTNAME,
    stripeSecret: "sk_test_51I7Af5DOYORLzGcpl3yeC2UHFL4a6fGWcKV13vTVfcP1UgxpMKKQw10TmapR7WZmY91yyXtYSUoIeLow8VDy41jr00mmGPzOnR"

}

module.exports = { config: config }