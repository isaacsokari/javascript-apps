const layout = require('../layout');

const { getErrors } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    title: 'Sign In',
    content: `
  <form method="post">
    <input type="email" name="email" placeholder="Enter Email Address" />
    ${getErrors(errors, 'email')}
    <input type="password" name="password" placeholder="Enter password" />
    ${getErrors(errors, 'password')}
    <button type="submit">Sign In</button>
  </form>
  `,
  });
};
