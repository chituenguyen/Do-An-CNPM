import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./../static/header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../action/userAction";
function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const userInfo_Register = userRegister.userInfo;
  var { userInfo } = userLogin;
  if (userInfo_Register !== null) {
    userInfo = userInfo_Register;
  }
  return (
    <header>
      <a href="/" class="logo">
        <i class="fas fa-utensils"></i>Sharingan
      </a>

      <nav class="navbar">
        <a class="active" href="/">
          home
        </a>
        <a href="/">dishes</a>
        <a href="/">about</a>
        <a href="/">menu</a>
        <a href="/">review</a>
      </nav>

      <div class="icons">
        <i class="fas fa-bars" id="menu-bars"></i>
        <i class="fas fa-search" id="search-icon"></i>
        <a class="fas fa-heart"></a>
        {userInfo ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleLogout}>Name</Button>
        )}
        <a href="/cart" class="fas fa-shopping-cart"></a>
      </div>
    </header>
  );
}

export default Header;
