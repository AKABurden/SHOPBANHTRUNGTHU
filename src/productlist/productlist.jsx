import React, { useState } from "react";

// Danh sách sản phẩm theo loại
function ProductList({ type, addToCart }) {
  const SWEET_PRODUCTS = [
    { id: 1, name: "Nhân sầu riêng - đậu xanh", price: 85000 },
    { id: 2, name: "Trà xanh hạt sen", price: 85000 },
    { id: 3, name: "Nhân mè đen", price: 75000 },
    { id: 4, name: "Nhân sữa dừa", price: 75000 },
  ];
  const SAVORY_PRODUCTS = [
    { id: 5, name: "Thập cẩm truyền thống", price: 95000 },
    { id: 6, name: "Thập cẩm tôm nướng ngũ vị", price: 115000 },
    { id: 7, name: "Thập cẩm Bát bửu (Bánh Chay)", price: 85000 },
    { id: 8, name: "Trứng muối chà bông (Hot Sale)", price: 85000 },
  ];

  const [activeTab, setActiveTab] = useState(type === "savory" ? "savory" : "sweet");
  const [selected, setSelected] = useState([]);

  const products = activeTab === "sweet" ? SWEET_PRODUCTS : SAVORY_PRODUCTS;

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddSelected = () => {
    products.forEach((p) => {
      if (selected.includes(p.id)) addToCart(p);
    });
    setSelected([]);
  };

  const showFloatingBtn = selected.length > 0;

  return (
    <div>
      <div className="category-tabs">
        <button
          className={`category-tab${activeTab === "sweet" ? " active" : ""}`}
          onClick={() => {
            setActiveTab("sweet");
            setSelected([]);
          }}
        >
          <span role="img" aria-label="cake" className="category-icon">🍰</span>
          Bánh ngọt
        </button>
        <button
          className={`category-tab${activeTab === "savory" ? " active" : ""}`}
          onClick={() => {
            setActiveTab("savory");
            setSelected([]);
          }}
        >
          <span role="img" aria-label="mooncake" className="category-icon">🥮</span>
          Bánh mặn
        </button>
      </div>
      <section className="product-section">
        <h2>{activeTab === "sweet" ? "Bánh ngọt" : "Bánh mặn"}</h2>
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p.id} style={{ position: "relative" }}>
              <input
                type="checkbox"
                checked={selected.includes(p.id)}
                onChange={() => handleSelect(p.id)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 2,
                  width: 20,
                  height: 20,
                  accentColor: "#e76f51"
                }}
              />
              <div className="product-img" />
              <h3>{p.name}</h3>
              <div className="product-price">{p.price.toLocaleString()}₫</div>
              <button className="buy-btn" onClick={() => addToCart(p)}>
                Thêm giỏ hàng
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* Floating button */}
      <button
        className={`floating-add-cart-btn${showFloatingBtn ? " show" : ""}`}
        onClick={handleAddSelected}
        style={{ position: "fixed", top: 80, right: 40, zIndex: 1000 }}
      >
        🛒 Thêm vào giỏ hàng
      </button>
    </div>
  );
}

export default ProductList;
