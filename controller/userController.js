const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const { unlink } = require('fs');
const path = require('path');

const getUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.render('user', {
      users: users,
      title: 'User page',
    });
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new UserModel({
      ...req.body,
      profileImage: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    });
  }
  try {
    const result = await newUser.save();
    console.log(result);

    res.status(200).json({
      message: 'User added successfully',
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Unknown error occur!',
        },
      },
    });
  }
};

const removeUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (user.profileImage) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Could not delete the user!',
        },
      },
    });
  }
};
module.exports = {
  getUser,
  addUser,
  removeUser,
};
