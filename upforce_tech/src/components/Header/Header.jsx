import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.scss";
const Header = () => {
  const navigate = useNavigate();
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
          <p  onClick={()=>navigate("/addUser")}>Add User</p>
          <p onClick={()=>navigate("/")}>Details Table</p>
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
