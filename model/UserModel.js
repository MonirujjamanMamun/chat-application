const { default: mongoose } = require('mongoose');

const userModelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      // match: /^\+[0-9]{1,3}[-.\s]?[0-9]{1,14}$/,
      // validate: {
      //   validator: function (v) {
      //     return /^\+[0-9]{1,3}[-.\s]?[0-9]{1,14}$/.test(v);
      //   },
      //   message: 'Invalid phone number format.',
      // },
    },
    profileImage: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    //   inbox: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Message',
    //     },
    //   ],
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model('userModel', userModelSchema);

module.exports = UserModel;
