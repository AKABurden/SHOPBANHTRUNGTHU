import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import QRthanhtoan from "./image/QRthanhtoan.jpg";
import BANNERHome from "./image/banner.png"; 
import LogoHeader from "./image/logo.png"; 
import Footer from "./footer";
// Header
function Header({ cartCount }) {
  return (
    <header className="main-header">
      <div className="container header-flex">
        <div className="logo">
          <img
             src={LogoHeader}
             Style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%;"
             alt="Logo"
          />

        </div>
        <nav className="main-nav">
          <Link to="/">TRANG CHỦ</Link>
          <Link to="/sweet">MENU BÁNH</Link>

          <Link to="/cart" className="cart-link">
            GIỎ HÀNG ({cartCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}

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
        src={BANNERHome}
        Style="width: 100%; height: 400px; object-fit: cover;"
        alt="Banner"
      />
    </section>
  );
}

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

  useEffect(() => {
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
// Giỏ hàng
function Cart({ cart, updateQty, clearCart, addToCart }) {
  const [selectedIds, setSelectedIds] = useState(cart.map(i => i.id));
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  // Tổng chỉ tính các món được chọn
  const total = cart
    .filter(i => selectedIds.includes(i.id))
    .reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedIds(cart.map(i => i.id));
    else setSelectedIds([]);
  };

  const handleAddToCart = () => {
    // Ví dụ: thêm 1 sản phẩm mẫu vào giỏ (bạn có thể mở modal chọn sản phẩm)
    addToCart({ id: 99, name: "Bánh mới thêm", price: 100000 });
  };

  const handlePay = () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      alert("Vui lòng nhập đầy đủ thông tin cá nhân!");
      return;
    }
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="cart page fade-in">
      <h2 className="cart">🛒 Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p className="title-white">Giỏ hàng trống.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedIds.length === cart.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()}₫</td>
                  <td>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      -
                    </button>
                    <span className="qty">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>{(item.price * item.qty).toLocaleString()}₫</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="add-more-btn"
            style={{ margin: "18px 0" }}
            onClick={handleAddToCart}
          >
            ➕ Thêm giỏ hàng
          </button>

          <div className="user-info">
            <h3>Thông tin khách hàng:</h3>
            <input
              type="text"
              placeholder="Họ và tên"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Địa chỉ giao hàng"
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
            />
          </div>

          <div className="cart-summary">
            <h3>
              Tổng: {total.toLocaleString()}₫
            </h3>
            <div className="cart-actions">
              <button className="add-more-btn" onClick={() => navigate("/")}>
                ➕ Chọn thêm món
              </button>
              <button className="pay-btn" onClick={handlePay}>
                💰 Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal fade-in">
          <div className="modal-content slide-up">
            <h3>🎉 Đặt hàng thành công!</h3>
            <p>
              Cảm ơn khách hàng {userInfo.name}, đơn hàng sẽ được giao đến{" "}
              {userInfo.address}.
            </p>
            <button
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                clearCart();
                navigate("/");
              }}
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
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

export default function App() {
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
      <Header cartCount={cart.length} />
      <main>
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
              <Cart cart={cart} updateQty={updateQty} clearCart={clearCart} />
            }
          />
        </Routes>
      </main>
        <Footer />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      <Feedback />
    </div>
  );
}