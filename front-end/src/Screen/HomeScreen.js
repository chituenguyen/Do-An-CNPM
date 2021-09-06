import React from "react";
import products from "./../products";
import { Row, Col } from "react-bootstrap";
import Product from "./../components/Product";

function HomeScreen() {
  return (
    <div>
      <h1>Lastest products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}>123</Product>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
