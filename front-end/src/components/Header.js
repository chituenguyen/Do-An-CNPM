import React from "react";
import "./../static/header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../action/userAction";
import { useState } from "react";

const NavBarAccount = () => {
  return (
    <div className="navbar-account">
      <i class="fas fa-users navbar-account-user"></i>
      <div className="navbar-account-io">
        <p className="navbar-logio">
          <a href="/login">Sign in</a> / <a href="/register">sign up</a>
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
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const userInfo_Register = userRegister.userInfo;
  var { userInfo } = userLogin;
  if (userInfo_Register !== null) {
    userInfo = userInfo_Register;
  }
  const handleLogout = () => {
    dispatch(logout());
  };
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
      <span className="navbar-user-name">{userInfo.name}</span>
      {show === "show" ? (
        <ul className="navbar-user-menu">
          <li>
            <Link to="/profile">
              <i class="fas fa-user-alt"></i>
              Profile
            </Link>
          </li>
          {userInfo.is_Admin ? (
            <li>
              <Link to="/admin/order">
                <i class="fas fa-money-bill"></i>
                List Order
              </Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <a onClick={handleLogout}>
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

  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const userInfo_Register = userRegister.userInfo;
  var { userInfo } = userLogin;
  if (userInfo_Register !== null) {
    userInfo = userInfo_Register;
  }
  const avatar = [
    {
      id: 1,
      img: "https://sohanews.sohacdn.com/thumb_w/660/160588918557773824/2021/10/25/photo1635121949916-1635121950037228899134.jpeg",
    },
  ];
  return (
    <header>
      <Link to="/" class="logo">
        <i class="fas fa-utensils"></i>Konoha
      </Link>

      <nav class="navbar">
        <a class="active" href="#home">
          home
        </a>
        <Link to="/">dishes</Link>
        <Link to="/">about</Link>
        <Link to="/">menu</Link>
        <Link to="/">review</Link>
      </nav>
      {userInfo ? <NavBarUser avatar={avatar} /> : <NavBarAccount />}
      <div class="icons">
        <i class="fas fa-bars" id="menu-bars"></i>
        <i class="fas fa-search" id="search-icon"></i>
        <i class="fas fa-heart"></i>
        <Link to="/cart" class="fas fa-shopping-cart"></Link>
      </div>

      {/* NavBarUser */}
    </header>
  );
}

export default Header;
