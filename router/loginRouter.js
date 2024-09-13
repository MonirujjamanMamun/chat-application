const express = require('express');
const {
  loginUser,
  login,
  logOut,
} = require('../controller/loginUserController');
const decorateHtmlResponse = require('../middleware/common/decoretHtmlRespons');
const {
  logInValidator,
  logInValidatorHandler,
} = require('../middleware/logInUserValidator');
const { redirectLogIn } = require('../middleware/common/loginGaurd');
const loginRouter = express.Router();

const page_title = 'Log In';
loginRouter
  .route('/')
  .get(decorateHtmlResponse(page_title), redirectLogIn, loginUser)
  .post(
    decorateHtmlResponse(page_title),
    logInValidator,
    logInValidatorHandler,
    login
  )
  .delete(logOut);
module.exports = loginRouter; // Export the router for use in other files.
