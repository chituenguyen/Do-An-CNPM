import React from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";

import products from "../products";

import { Link } from "react-router-dom";

function CartScreen() {
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            {products.map((product) => (
              <ListGroup.Item variant="flush">
                <Row>
                  <Col md={2}>
                    <Image
                      src={`${product.image}`}
                      style={{
                        width: "60px",
                      }}
                      rounded
                    />
                  </Col>

                  <Col md={3}>{product.name}</Col>

                  <Col md={2}>${product.price}</Col>

                  <Col md={2}>
                    <Form.Control as="select" defaultValue={1}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button type="button" variant="light">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>SubTotal (5) items</h2>
                $1000
              </ListGroupItem>
              <ListGroupItem className="d-grid gap-2">
                <Button type="button" className="btn-block">
                  Process To Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
