require('dotenv').config();

const config = {
    authTokenSecret: process.env.AUTH_TOKEN_SECRET,
    port: process.env.PORT || 4000,
    nameApp: process.env.APP,
    mongodb: process.env.MONGO_URI,
    frontendUrl: process.env.FRONTEND_URL,
    baseUrl: process.env.HOSTNAME

}

module.exports = { config: config }