const Router = require("koa-router");
const { savaAvatarInfo } = require("../controller/file.controller");

const { verifyAuth } = require("../middleware/auth.middleware");
const { avatarHandler } = require("../middleware/file.middleware");

const fileRouter = new Router({ prefix: "/upload" });

fileRouter.post("/avatar", verifyAuth, avatarHandler, savaAvatarInfo);

module.exports = fileRouter;
