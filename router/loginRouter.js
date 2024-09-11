const express = require('express');
const { loginUser, login } = require('../controller/loginUserController');
const decorateHtmlResponse = require('../middleware/common/decoretHtmlRespons');
const {
  logInValidator,
  logInValidatorHandler,
} = require('../middleware/logInUserValidator');
const loginRouter = express.Router();

const page_title = 'Log In';
loginRouter.get('/', decorateHtmlResponse(page_title), loginUser);
loginRouter.post(
  '/',
  decorateHtmlResponse(page_title),
  logInValidator,
  logInValidatorHandler,
  login
);

module.exports = loginRouter; // Export the router for use in other files.
