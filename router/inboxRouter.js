const express = require('express');
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decoretHtmlRespons');
const { logInGaurd } = require('../middleware/common/loginGaurd');

const inboxRouter = express.Router();
inboxRouter.get('/', decorateHtmlResponse('Inbox'), logInGaurd, getInbox);
module.exports = inboxRouter;
