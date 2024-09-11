const { check, validationResult } = require('express-validator');

const logInValidator = [
  check('username')
    .isLength({ min: 1 })
    .withMessage('Email or Mobile number is required'),
  check('password').isLength({ min: 1 }).withMessage('Password is required'),
  // Add more checks as needed
];

const logInValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();
  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: mappedError,
    });
  }
};
module.exports = { logInValidator, logInValidatorHandler };
