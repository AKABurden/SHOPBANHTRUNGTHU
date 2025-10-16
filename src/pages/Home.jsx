import React from "react";
import Header from "../header/header.jsx";
import HomeComponent from "../home/home.jsx";
import Footer from "../footer/footer.jsx";

function Home({ addToCart }) {
  return (
    <div>
      <Header />
      <main>
        <HomeComponent addToCart={addToCart} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
