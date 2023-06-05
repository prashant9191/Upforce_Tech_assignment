import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./style.scss";
const Header = () => {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <>
      <div className="Header_div">
        <h2>MERN stack developer prectical task</h2>
      </div>
      <header>
        <h3>LOGO</h3>
        <nav ref={navRef}>
          <a href="/addUser">Add User</a>
          <a href="/details">Details Table</a>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
};

export default Header;
