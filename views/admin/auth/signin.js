const layout = require('../layout');

module.exports = () => {
  return layout({
    title: 'Sign In',
    content: `
  <form method="post">
    <input type="email" name="email" placeholder="Enter Email Address" />
    <input type="password" name="password" placeholder="Enter password" />
    <button type="submit">Sign In</button>
  </form>
  `,
  });
};
