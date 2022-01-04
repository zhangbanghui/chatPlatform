const Router = require("koa-router");

const { create, getDetail, list, update, remove } = require("../controller/moment.controlller");
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')


const momentRouter = new Router({ prefix: "/moment" });

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', getDetail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission('moment'), update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission('moment'), remove)

module.exports = momentRouter
