const Multer = require('koa-multer')

const avatorUpload = Multer({
  dest: './uploads/avatar'
})

const avatarHandler = avatorUpload.single('avatar')

module.exports = {
  avatarHandler
}
