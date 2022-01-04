const Router = require('koa-router');
const { create, reply, update, remove } = require('../controller/comment.controller');
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');

const commentRouter = new Router({prefix: '/comment'})

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/reply/:commentId', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission('comment'),update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission('comment'), remove)

module.exports = commentRouter;