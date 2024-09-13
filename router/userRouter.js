const express = require('express');
const {
  getUser,
  addUser,
  removeUser,
} = require('../controller/userController');

const imageUpload = require('../middleware/userProfileImgUpload');
const {
  addUserValidator,
  addUserValidationHandler,
} = require('../middleware/addUserValidator');
const decorateHtmlResponse = require('../middleware/common/decoretHtmlRespons');
const { logInGaurd } = require('../middleware/common/loginGaurd');

const userRouter = express.Router();
userRouter.get('/', decorateHtmlResponse('User'), logInGaurd, getUser);
userRouter.post(
  '/',
  logInGaurd,
  imageUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);
userRouter.delete('/:id', removeUser);

module.exports = userRouter;
