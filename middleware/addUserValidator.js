const { check } = require('express-validator');
const createError = require('http-errors');
const UserModel = require('../model/UserModel');
const { validationResult } = require('express-validator');
const { unlink } = require('fs');
const path = require('path');

const addUserValidator = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' _' })
    .withMessage('Name must not contain anything other than alphabet')
    .trim(),

  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await UserModel.findOne({ email: value });
        if (user) {
          throw createError('Email already exists');
        }
      } catch (error) {
        throw createError(err.message);
      }
    }),
  check('mobile')
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Mobile number must be a valid Bangladeshi number.')
    .custom(async (value) => {
      try {
        const user = await UserModel.findOne({ mobile: value });
        if (user) {
          throw createError('Mobile number already exists');
        }
      } catch (error) {
        throw createError(err.message);
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mapError = errors.mapped();
  if (Object.keys(mapError).length === 0) {
    next();
  } else {
    if (req.files.length > 0) {
      const { fileName } = req.files[0];
      unlink(path.join(__dirname, `/../public/uploads/${fileName}`), (err) => {
        if (err) console.log(err);
      });
    }
    res.status(500).json({
      errors: mapError,
    });
  }
};

module.exports = { addUserValidator, addUserValidationHandler };
