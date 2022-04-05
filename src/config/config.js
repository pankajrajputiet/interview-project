const {createLogger ,format,transports} = require("winston");
const logger = createLogger({
    format:format.combine(format.timestamp(),format.json()),
    transports:[new transports.Console({})]
})

const PORT = 3000;
const  DB_URL = "mongodb://localhost:27017/userDB"

module.exports = {logger,PORT,DB_URL}