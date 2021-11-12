import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Alert,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Checkout from "./../components/Checkout";
import { createOrder } from "./../action/orderAction";

function PlaceOrderScreen({ history, location }) {
  // const orderCreate = useSelector((state) => state.orderCreate);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 500 || cart.itemsPrice === 0 ? 0 : 10;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  if (!cart.payment) {
    history.push("/payment");
  }
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItem: cart.cartItems,
        shippingAdress: cart.shipping,
        paymentMethod: cart.payment,
        totalPrice: cart.totalPrice,
        shippingPrice: cart.shippingPrice,
        itemsPrice: cart.itemsPrice,
      })
    );
  };
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, order, error } = orderCreate;
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, order, success]);
  return (
    <div>
      <Checkout step1 step2 step3 step4></Checkout>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shipping.address},{cart.shipping.city}{" "}
                {cart.shipping.postalCode} {cart.shipping.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>

                {cart.payment}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alert variant="info">
                  Your cart is empty <Link to="/">Go Back</Link>
                </Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => {
                    return (
                      <ListGroupItem key={item.product._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={`${item.product.image}`}
                              fluid
                              rounded
                            ></Image>
                          </Col>
                          <Col>{item.product.name}</Col>
                          <Col md={4}>
                            {item.quantity} X ${item.product.price} = $
                            {item.quantity * item.product.price}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>

                {/* {error ? (
                  <ListGroup.Item>
                    <Alert variant="info">{error}</Alert>
                  </ListGroup.Item>
                ) : (
                  ""
                )} */}
              </ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={() => placeOrder()}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
