import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetOrder } from "../action/orderAction";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
function OrderScreen({ history, match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo) {
      dispatch(userGetOrder(userInfo.token, orderId));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  const { order, loading } = useSelector((state) => state.userGetOrder);
  return loading ? (
    ""
  ) : (
    <div>
      <h1>Order : {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name :</strong> {order.user.name}
              </p>
              <p>
                <strong>Email :</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city}{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDeliver ? (
                <Alert variant="info">Delivered on {order.deliverAt}</Alert>
              ) : (
                <Alert variant="warning">Not Delivered</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>

                {order.payment_Method}
              </p>
              {order.isPaid ? (
                <Alert variant="info">Paid on {order.paidAt}</Alert>
              ) : (
                <Alert variant="warning">Not Paid</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orders.length === 0 ? (
                <Alert variant="info">
                  Order is empty <Link to="/">Go Back</Link>
                </Alert>
              ) : (
                <ListGroup variant="flush">
                  {order.orders.map((item) => {
                    return (
                      <ListGroupItem key={item.product}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} fluid rounded></Image>
                          </Col>
                          <Col>{item.name}</Col>
                          <Col md={4}>
                            {item.qty} X ${item.price} = $
                            {item.qty * item.price}
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
                  <Col>${order.total_Price - order.shipping_Price}</Col>
                </Row>

                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shipping_Price}</Col>
                </Row>

                <Row>
                  <Col>Total:</Col>
                  <Col>${order.total_Price}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
