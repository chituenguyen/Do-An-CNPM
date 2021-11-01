import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating.js";
import { Link } from "react-router-dom";
import "./../static/product.css";

function Product({ product }) {
  return (
    <div>
      {/* p:padding m:margin y:both top and bottom */}
      <div class="box">
        <a href="#" class="fas fa-heart"></a>
        <a href="#" class="fas fa-eye"></a>
        <Card.Img src={product.image}></Card.Img>
        <h3>tasty food</h3>
        <Rating value={product.rating} color={"var(--green)"}></Rating>
        <span>$15.99</span>
      </div>
    </div>
  );
}

export default Product;
