const app = require('./app')
const { APP_PORT } = require('./app/config')

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功~,当前端口${APP_PORT}`)
})