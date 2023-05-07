import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Product from "./components/Product";
import CartPage from "./components/CartPage";
import { getProducts } from "./components/api";
import "./css/App.css";
import Header from "./components/Header";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);

  // Fetches the products
  useEffect(() => {
    async function fetchProducts() {
      const productsArray = await getProducts();
      setProducts(productsArray);
    }
    fetchProducts();
  }, []);

  // Adds a product to the cart
  const addToCart = (product, quantity) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    const availableStock = product.antal;

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      const itemInCart = updatedCart[existingItemIndex];
      const newQuantity = Math.min(itemInCart.antal + quantity, availableStock);

      itemInCart.antal = newQuantity;
      setCart(updatedCart);
    } else {
      const newQuantity = Math.min(quantity, availableStock);

      setCart([...cart, { ...product, antal: newQuantity }]);
    }
  };

  // Empty the cart
  const emptyCart = () => {
    setCart([]);
    setShowCartPage(false);
  };

  // Calculates the total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.pris * item.antal, 0);
  };

  // Calculates the total quantity of items in the cart
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.antal, 0);
  };

  // Handles the order placement
  const handleOrder = async () => {
    const updatedProducts = [...products];
    const cartItems = [...cart];

    cartItems.forEach((cartItem) => {
      const productIndex = updatedProducts.findIndex(
        (item) => item.id === cartItem.id
      );
      updatedProducts[productIndex].antal -= cartItem.antal;
    });

    await fetch(
      "https://products1-f84b0-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "PUT",
        body: JSON.stringify(updatedProducts),
      }
    );

    setProducts(updatedProducts);
    setCart([]);
  };

  const handleCartButtonClick = () => {
    setShowCartPage(true);
  };

  const handleProductsButtonClick = () => {
    setShowCartPage(false);
  };

  return (
    <div className="App">
      <Header
        getTotalQuantity={getTotalQuantity}
        handleCartButtonClick={handleCartButtonClick}
        handleProductsButtonClick={handleProductsButtonClick}
      />

      {!showCartPage &&
        products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}

      {showCartPage && (
        <CartPage
          cart={cart}
          emptyCart={emptyCart}
          handleOrder={handleOrder}
          getTotalPrice={getTotalPrice}
        />
      )}
    </div>
  );
}

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
