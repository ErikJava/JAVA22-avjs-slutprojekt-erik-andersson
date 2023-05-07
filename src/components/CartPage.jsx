import React, { useState } from "react";

function CartPage({ cart, emptyCart, getTotalPrice, handleOrder }) {
  const totalQuantity = cart.reduce((total, item) => total + item.antal, 0);
  const [ordered, setOrdered] = useState(false);

  const handleOrderClick = () => {
    handleOrder();
    setOrdered(true);
  };

  return (
    <div className="cart-container">
      <h2>Cart ({totalQuantity})</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h3>{item.namn}</h3>
            <p>Price: {item.pris} kr</p>
            <p>Quantity: {item.antal}</p>
          </li>
        ))}
      </ul>
      <p>Total: {getTotalPrice()} kr</p>
      <button id="empty-cart-button" onClick={emptyCart}>
        Empty cart
      </button>
      <button id="order-button" onClick={handleOrderClick}>
        Order
      </button>
      {ordered && <h3>Thank you for your order!</h3>}
    </div>
  );
}

export default CartPage;
