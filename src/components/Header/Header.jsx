import React from "react";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='h-[80px] bg-black flex justify-center items-center'>
      <div className='w-32'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='h-full object-contain' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
