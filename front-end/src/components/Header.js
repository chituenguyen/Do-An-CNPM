import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./../static/header.css";
function Header() {
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
    </header>
  );
}

export default Header;
