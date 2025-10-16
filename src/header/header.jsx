import React from "react";
import { Link } from "react-router-dom";
import LogoHeader from "../image/logo.png";
import styles from "./header.module.css";

// Header
function Header({ cartCount }) {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerFlex}>
        <div className={styles.logo}>
          <img
             src={LogoHeader}
             Style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%;"
             alt="Logo"
          />

        </div>
        <nav className={styles.mainNav}>
          <Link to="/">TRANG CHỦ</Link>
          <Link to="/sweet">MENU BÁNH</Link>

          <Link to="/cart" className={styles.cartLink}>
            GIỎ HÀNG ({cartCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
