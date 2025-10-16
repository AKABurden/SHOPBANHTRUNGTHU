import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";

// Giỏ hàng
function Cart({ cart, updateQty, clearCart }) {
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
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            <table className={styles.cartTable}>
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
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <button
      className="qty-btn"
      onClick={() => updateQty(item.id, item.qty - 1)}
      disabled={item.qty <= 1}
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
  </div>
</td>
                    <td>{(item.price * item.qty).toLocaleString()}₫</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.cartSidebar}>
            <div className={styles.userInfo}>
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

            <div className={styles.cartSummary}>
              <h3>
                Tổng: {total.toLocaleString()}₫
              </h3>
              <div className={styles.cartActions}>
                <button className={styles.addMoreBtn} onClick={() => navigate("/")}>
                  ➕ Chọn thêm món
                </button>
                <button className={styles.payBtn} onClick={handlePay}>
                  💰 Thanh toán
                </button>
              </div>
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

export default Cart;