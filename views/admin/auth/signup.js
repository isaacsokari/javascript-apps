const layout = require('../layout');

module.exports = ({ req }) => {
  return layout({
    title: 'Sign Up',
    content: `
<h1>hi there, your id is ${req.session.userId}</h1>
  <form method="post">
  <input type="email" name="email" placeholder="Enter Email Address" />
  <input type="password" name="password" placeholder="Enter password" />
  <input
    type="password"
    name="passwordConfirm"
    placeholder="Re-enter password"
  />
  <button type="submit">Sign Up</button>
</form>
`,
  });
};
