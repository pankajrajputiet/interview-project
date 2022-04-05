const express = require("express");
const userRouter = require("./controller/userController")
const app = express();
const config = require("./config/config")
const logger = config.logger;

app.use(express.json())
app.use("/",userRouter)
app.listen(config.PORT,()=>{
    logger.info(`server is running at port ${config.PORT}`)
})
