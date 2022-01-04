const errorTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTED:
      status = 409;
      message = "用户名已经存在";
      break;
    case errorTypes.USER_DOES_NOT_EXIST:
      status = 400;
      message = "用户不存在";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400;
      message = "密码错误";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "无效的token";
      break;
    case errorTypes.UNPERMISSINO:
      status = 401;
      message = "您不具备操作的权限";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
      break;
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
