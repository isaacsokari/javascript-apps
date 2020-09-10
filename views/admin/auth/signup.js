const layout = require('../layout');

const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return '';
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    title: 'Sign Up',
    content: `
<h1>hi there, your id is ${req.session.userId}</h1>
  <form method="post">
  <input type="email" name="email" placeholder="Enter Email Address" />
  ${getError(errors, 'email')}
  <input type="password" name="password" placeholder="Enter password" />
  ${getError(errors, 'password')}
  <input
    type="password"
    name="passwordConfirm"
    placeholder="Re-enter password"
  />
  ${getError(errors, 'passwordConfirm')}
  <button type="submit">Sign Up</button>
</form>
`,
  });
};
