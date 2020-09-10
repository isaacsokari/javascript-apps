const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [
    check('email')
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
    check('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    check('passwordConfirm')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
      .custom(async (passwordConfirm, { req }) => {
        if (passwordConfirm !== req.body.password)
          throw new Error('Passwords do not match');
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    const { email, password, passwordConfirm } = req.body;

    // create user to represent this person
    const user = await usersRepo.create({ email, password });

    // store the id in the users cookie
    req.session.userId = user.id;

    res.send('<h1>Account Created</h1>');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;

  res.send('You are signed out');
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('Email not found');
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send('Invalid Password');
  }

  req.session.userId = user.id;

  res.send('You are signed in');
});

module.exports = router;