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
  confirmPasswordsMatch: check('passwordConfirmation')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password)
        throw new Error('Passwords do not match');
    }),
  checkEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is not valid')
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });

      if (!user) {
        throw new Error('Email not found');
      }
    }),
  checkSigninPassword: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });

      if (!user) {
        throw new Error('Invalid password');
      }

      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error('Invalid Password');
      }
    }),
  requireTitle: check('title')
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage('Title must be between 5 and 40 characters'),
  requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage('Price must be at least 1.00'),
};
