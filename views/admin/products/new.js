const layout = require('../layout');
const { getErrors } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <form method="POST">
        <input placeholder="title" name="title" />
        <input placeholder="price" name="price" />
        <input type="file" name="image" />
        <button type="submit">Submit</button>
      </form>
    `,
  });
};
