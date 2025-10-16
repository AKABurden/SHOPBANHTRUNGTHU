import React from "react";
import Header from "../header/header.jsx";
import CartComponent from "../cart/cart.jsx";
import Footer from "../footer/footer.jsx";

function Cart({ cart, updateQty, clearCart, addToCart }) {
  return (
    <div>
      <Header />
      <main>
        <CartComponent cart={cart} updateQty={updateQty} clearCart={clearCart} addToCart={addToCart} />
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
