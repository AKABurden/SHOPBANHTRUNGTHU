import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './header.module.css';

function Header({ cartCount }) {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerFlex}>
        <div className={styles.logo}>
          <img
            src="/image/logo.png"
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
            alt="Company Logo"
          />
        </div>
        <nav className={styles.mainNav}>
          <NavLink to="/" exact activeClassName={styles.active}>
            TRANG CHỦ
          </NavLink>
          <NavLink to="/sweet" activeClassName={styles.active}>
            MENU BÁNH
          </NavLink>
          <NavLink to="/cart" className={styles.cartLink} activeClassName={styles.active}>
            GIỎ HÀNG ({cartCount})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

Header.defaultProps = {
  cartCount: 0,
};

export default Header;