const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const productsRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['asdfasdf;lj sadf sfa'],
  })
);
app.use(authRouter);
app.use(productsRouter);

app.get('/', (req, res) => {
  res.redirect('/signin');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
