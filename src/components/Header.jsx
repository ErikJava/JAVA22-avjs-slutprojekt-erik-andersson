import React from "react";

function Header(props) {
  const { getTotalQuantity, handleCartButtonClick, handleProductsButtonClick } =
    props;

  return (
    <header className="App-header">
      <h1 id="header-h1">Webshop</h1>
      <nav>
        <ul>
          <li>
            <button id="cart-button" onClick={handleCartButtonClick}>
              Cart ({getTotalQuantity()})
            </button>
          </li>
          <li>
            <button id="products-button" onClick={handleProductsButtonClick}>
              Products
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
