import React from "react";
import "./footer.css";
import Logo from "../image/logo.png";
export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        {/* Thông tin công ty */}
        <div className="footer-info">
          <img
            src= {Logo}
            alt="Tiệm bánh Pico"
          />
          <h3>Tiệm bánh Pico</h3>
          <p>
            <b>Địa chỉ:</b> Bình chánh
          </p>
          <p>
            <b>Liên hệ:</b> +84 762425342
          </p>
          <p>
            <b>Email:</b> <a href="mailto:trantuyetmy1693@gmail.com">trantuyetmy1693@gmail.com</a>
          </p>
        </div>
        {/* Liên kết */}
        <div className="footer-links">
          <a href="#">Về chúng tôi</a>
          <a href="#">Giải pháp</a>
          <a href="#">Liên hệ</a>
        </div>
        {/* Đăng ký nhận tin */}
        <div className="footer-newsletter">
          <p>Đăng ký email để nhận tin tức mới nhất từ PalmTek</p>
          <form>
            <input type="email" placeholder="Nhập email của bạn..." />
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        © 2007 PalmTek
      </div>
    </footer>
  );
}
