import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./../static/header.css";
import { useState } from "react";
const NavBarAccount = () => {
  return (
    <div className="navbar-account">
      <i class="fas fa-users navbar-account-user"></i>
      <div className="navbar-account-io">
        <p className="navbar-logio">
          <a href="">Sign in</a> / <a href="">sign up</a>
        </p>
        <p className="navbar-account-nick">
          Account
          <i class="fas fa-sort-down"></i>
        </p>
      </div>
    </div>
  );
};
const NavBarUser = ({ avatar }) => {
  const [show, setShow] = useState("hide");
  const handleShow = () => {
    setShow(show === "hide" ? "show" : "hide");
  };
  return (
    <div className="navbar-user" onClick={handleShow}>
      <img
        src={avatar[0].img}
        alt={avatar[0].name}
        className="navbar-user-img"
      />
      <span className="navbar-user-name">{avatar[0].name}</span>
      {show === "show" ? (
        <ul className="navbar-user-menu">
          <li>
            <a href="">
              <i class="fas fa-cart-plus"></i>
              My collections
            </a>
          </li>
          <li>
            <a href="">
              <i class="fas fa-user-alt"></i>
              Profile
            </a>
          </li>
          <li>
            <a href="">
              <i class="fas fa-bell"></i>
              Notification
            </a>
          </li>
          <li>
            <a href="">
              <i class="fas fa-info-circle"></i>
              Help
            </a>
          </li>
          <li>
            <a href="">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
function Header() {
  // if true is login else false is sign up hoac sign in
  const [user, setUser] = useState(false);
  const avatar = [
    {
      id: 1,
      name: "Ole Gunnar Solskjær",
      img: "https://sohanews.sohacdn.com/thumb_w/660/160588918557773824/2021/10/25/photo1635121949916-1635121950037228899134.jpeg",
    },
  ];
  return (
    <header>
      <a href="/" class="logo">
        <i class="fas fa-utensils"></i>Sharingan
      </a>

      <nav class="navbar">
        <a class="active" href="#home">
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
        <a href="" class="fas fa-heart"></a>
        <a href="cart" class="fas fa-shopping-cart"></a>
      </div>

      {/* NavBarUser */}
      {user ? <NavBarUser avatar={avatar} /> : <NavBarAccount />}
    </header>
  );
}

export default Header;
