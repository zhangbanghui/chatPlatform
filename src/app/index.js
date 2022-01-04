const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const userRouter = require('../routers/user.router')
const authRouter = require('../routers/auth.router')
const errorHandler = require('./error-handle')
const useRoutes = require('../routers')

const app = new Koa()

app.use(bodyParser())
useRoutes(app)
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())

app.on('error', errorHandler)

// 路径 - 中间件 处理映射

module.exports = app