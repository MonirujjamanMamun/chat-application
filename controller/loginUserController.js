const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const loginUser = (req, res) => {
  res.render('index', {
    title: 'Index page',
  });
};

const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const userObject = {
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          role: 'user',
        };
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        res.cookie(process.env.TOKEN_NAME, token, {
          maxAge: 86400000,
          httpOnly: true,
          signed: true,
        });
        res.locals.loggedInUser = userObject;
        res.render('inbox');
      } else {
        throw createError(401, 'Login failed! Please try again.');
      }
    } else {
      throw createError(401, 'Login failed! Please try again.');
    }
  } catch (error) {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};
const logOut = (req, res) => {
  res.clearCookie(process.env.TOKEN_NAME);
  res.send('Log Out successfully');
};
module.exports = {
  loginUser,
  login,
  logOut,
};
