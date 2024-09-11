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
      const isValidPassword = bcrypt.compare(req.body.password, user.password);
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
          maxAge: '1d',
          httpOnly: true,
          sign: true,
        });
        res.locals.loggedInUser = userObject;
        res.redirect('inbox');
      } else {
        throw createError(401, 'Invalid username or password');
      }
    } else {
      throw createError(401, 'Invalid username or password');
    }
  } catch (error) {
    res.render('index', {
      data: { data: res.body.username },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

module.exports = {
  loginUser,
  login,
};
