const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });

      if (existingUser) {
        throw new Error('Email already exists');
      }
    }),
  checkPassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
  confirmPasswordsMatch: check('passwordConfirm')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
    .custom(async (passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password)
        throw new Error('Passwords do not match');
    }),
};
