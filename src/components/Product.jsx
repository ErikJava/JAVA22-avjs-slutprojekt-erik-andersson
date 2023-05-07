import React from "react";

function Product({ product, addToCart }) {
  return (
    <li id="productlist" key={product.id}>
      <h3>{product.namn}</h3>
      <img src={product.bild} />
      <p>Price: {product.pris} kr</p>
      <p>Description: {product.beskrivning}</p>
      <p>Stock: {product.antal}</p>
      <button
        id="add-to-cart-button"
        onClick={() => addToCart(product, 1)}
        disabled={product.antal === 0}
      >
        Add to cart
      </button>
    </li>
  );
}

export default Product;
