const Router = require('koa-router')
const { create } = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const LabelRouter = new Router({prefix: '/label'})

LabelRouter.post('/', verifyAuth, create)

module.exports = LabelRouter
