const createError = require('http-errors');
const Conversation = require('../model/Conversation');
const UserModel = require('../model/UserModel');
const escape = require('../utils/escape');
const Message = require('../model/Message');

const getInbox = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { 'creator.id': req.user.userid },
        { 'participant.id': req.user.userid },
      ],
    });
    res.local.data = conversations;
    res.render('inbox');
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  const user = req.body.user;
  const searchQuery = user.replace('+88', ' ');
  const nameSearchRex = new RexExp(escape(searchQuery), 'i');
  const mobileSearchRex = new RexExp('^' + escape('+88' + searchQuery));
  const emailSearchRex = new RexExp('^' + escape(searchQuery) + '$', 'i');
  try {
    if (searchQuery !== '') {
      const users = await UserModel.find(
        {
          $or: [
            { name: nameSearchRex },
            { mobile: mobileSearchRex },
            { email: emailSearchRex },
          ],
        },
        'name avatar'
      );
      res.json(users);
    } else {
      throw createError('You must provide some text to search!');
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

const addConversation = async (req, res, next) => {
  try {
    const conversation = new Conversation({
      creator: {
        id: req.user.userid,
        name: req.user.username,
        profileImage: req.user.profileImage || null,
      },
      participant: {
        id: req.body.id,
        name: req.body.participant,
        profileImage: req.body.userImage || null,
      },
    });
    const result = await conversation.save();
    console.log('result', result);

    res.status(200).json({ message: 'Conversation was added successfully!' });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

const getMessage = async (req, res, next) => {
  try {
    const message = await Message.find({
      conversation_id: req.params.conversation_id,
    }).sort('- createdAt');
    const { participant } = await Conversation.findById({
      _id: req.params.conversation_id,
    });
    res.status(200).json({
      data: {
        messages: messages,
        participant,
      },
      user: req.user.userid,
      conversation_id: req.params.conversation_id,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Unknowns error occurred!',
        },
      },
    });
  }
};

module.exports = {
  getInbox,
  searchUser,
  addConversation,
  getMessage,
};
