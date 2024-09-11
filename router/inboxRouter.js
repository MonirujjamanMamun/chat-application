const express = require('express');
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decoretHtmlRespons');

const inboxRouter = express.Router();
inboxRouter.get('/', decorateHtmlResponse('Inbox'), getInbox);
module.exports = inboxRouter;
