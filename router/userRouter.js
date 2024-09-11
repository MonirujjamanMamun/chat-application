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

const userRouter = express.Router();
userRouter.get('/', decorateHtmlResponse('User'), getUser);
userRouter.post(
  '/',
  imageUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);
userRouter.delete('/:id', removeUser);

module.exports = userRouter;
