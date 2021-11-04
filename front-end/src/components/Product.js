import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating.js";
import { Link } from "react-router-dom";
import "./../static/product.css";

function Product({ product }) {
  return (
    <div>
      {/* p:padding m:margin y:both top and bottom */}
      <Link to={`product/${product._id}`} style={{ textDecoration: "none" }}>
        <div class="box" style={{ cursor: "pointer" }}>
          <a href="#" class="fas fa-eye"></a>
          <Card.Img src={product.image}></Card.Img>
          <h3 style={{ height: "50px" }}>{product.name}</h3>
          <Rating value={product.rating} color={"var(--green)"}></Rating>
          <span>$15.99</span>
        </div>
      </Link>
    </div>
  );
}

export default Product;
