import React from "react";
import logo from "../../assets/img/logo.png";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='h-[120px] bg-black flex justify-center items-center'>
      <div className={styles.logo}>
        <Link to='/'>
          <img src={logo} alt='' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
