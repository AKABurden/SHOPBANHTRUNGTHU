import React from "react";
import Header from "../header/header.jsx";
import ProductListComponent from "../productlist/productlist.jsx";
import Footer from "../footer/footer.jsx";

function ProductList({ type, addToCart }) {
  return (
    <div>
      <Header />
      <main>
        <ProductListComponent type={type} addToCart={addToCart} />
      </main>
      <Footer />
    </div>
  );
}

export default ProductList;
