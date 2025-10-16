import React, { useState } from "react";

// Banner lớn
function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2>Tiệm bánh Pico</h2>
        <h1>BÁNH SIU NGONNN</h1>
      </div>
      <img
        className="banner-img"
        src={`${process.env.PUBLIC_URL}/banner.png`}
        Style="width: 100%; height: 400px; object-fit: cover;"
        alt="Banner"
      />
    </section>
  );
}

// Trang chủ: hiển thị banner + sản phẩm mới
function Home({ addToCart }) {
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
  ]
  const [selected, setSelected] = useState([]);
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddSelected = () => {
    const allProducts = [...SWEET_PRODUCTS, ...SAVORY_PRODUCTS];
    selected.forEach((id) => {
      const product = allProducts.find((p) => p.id === id);
      if (product) addToCart(product);
    });
    setSelected([]);
  };

  // Animation: hiện nút khi có sản phẩm được chọn
  const showFloatingBtn = selected.length > 0;
  return (
    <div>
      <Banner />
      <section className="product-section">
        <h2>Sản phẩm mới</h2>
        <div className="product-grid">
          {[...SWEET_PRODUCTS, ...SAVORY_PRODUCTS].map((p) => (
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

export default Home;
