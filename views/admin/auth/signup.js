const layout = require('../layout');

const { getErrors } = require('../../helpers');

module.exports = ({ req, errors }) => {
  return layout({
    title: 'Sign Up',
    content: `
<h1>hi there, your id is ${req.session.userId}</h1>
  <form method="post">
  <input type="email" name="email" placeholder="Enter Email Address" />
  ${getErrors(errors, 'email')}
  <input type="password" name="password" placeholder="Enter password" />
  ${getErrors(errors, 'password')}
  <input
    type="password"
    name="passwordConfirm"
    placeholder="Re-enter password"
  />
  ${getErrors(errors, 'passwordConfirm')}
  <button type="submit">Sign Up</button>
</form>
`,
  });
};
