const layout = require('../layout');

module.exports = ({ items }) => {
  let totalPrice = 0;

  totalPrice = items.reduce((prev, item) => {
    return prev + item.quantity * item.product.price;
  }, 0);

  // items.forEach((item) => {
  //   totalPrice += item.product.price * item.quantity;
  // });

  const renderedItems = items
    .map((item) => {
      return `
        <div class="cart-item message">
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right">
            <div>
              $${item.product.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
              $${item.product.price * item.quantity}
            </div>
            <div class="remove">
              <form method="POST" action="/cart/products/delete">
                <input hidden value="${item.id}" name="itemId" />
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return totalPrice
    ? layout({
        content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths mx-4">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              <h1 class="title">$${totalPrice}</h1>
              <button class="button is-primary">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
      })
    : layout({
        content: `
        <div id="cart" class="container">
          <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths mx-4">
              <h3 class="subtitle"><b>Shopping Cart</b></h3>
              <div class="total message is-info">
                  <h1 class="title is-info">There are no items in your cart</h1>
                  <a class="link" href="/">Click Here to view all the Products</a>
              </div>
            </div>
            <div class="column"></div>
          </div>
        </div>
      `,
      });
};
