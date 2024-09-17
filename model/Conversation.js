const mongoose = require('mongoose');
const conversationSchema = mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      profileImage: String,
    },
    participant: {
      id: mongoose.Types.ObjectId,
      name: String,
      profileImage: String,
    },
    last_update: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
