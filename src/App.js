import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import Cart from "./pages/Cart.jsx";
import "./App.css";

// Feedback chạy góc phải
function Feedback() {
  const feedbacks = [
    "🌟 Rất hài lòng, bánh ngon tuyệt!",
    "🎂 Đóng gói đẹp, giao hàng nhanh!",
    "😋 Bánh mềm, thơm, vị vừa miệng.",
    "💯 Sẽ ủng hộ tiệm dài dài!",
    "🔥 Bánh mặn siêu ngon, ăn là ghiền!",
  ];
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % feedbacks.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [feedbacks.length]);

  return (
    <div className="feedback-container">
      <div key={index} className="feedback">
        {feedbacks[index]}
      </div>
    </div>
  );
}

// Toast thông báo
function Toast({ message, onClose }) {
  return (
    <div className="toast slide-down">
      {message}
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`Đã thêm ${product.name} vào giỏ hàng`);
    setTimeout(() => setToast(""), 2000);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart(cart.filter((i) => i.id !== id));
    else setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/sweet"
          element={<ProductList type="sweet" addToCart={addToCart} />}
        />
        <Route
          path="/savory"
          element={<ProductList type="savory" addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} updateQty={updateQty} clearCart={clearCart} addToCart={addToCart} />
          }
        />
      </Routes>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      <Feedback />
    </div>
  );
}

export default App;
