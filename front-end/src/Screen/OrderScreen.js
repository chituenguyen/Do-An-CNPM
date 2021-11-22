import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetOrder, payOrder, deliverOrder } from "../action/orderAction";
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
import { PayPalButton } from "react-paypal-button-v2";
function OrderScreen({ history, match }) {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AULqWoK7zngoomgGdteyAR8zwjlqfVbB-zhTe9mLOwH-xasngB-aPwTD2oDjsKbOll8oIrm2uvQp1TyQ";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.append(script);
  };
  useEffect(() => {
    if (userInfo || successPay) {
      dispatch(userGetOrder(userInfo.token, orderId));
    } else if (!order.is_Paid) {
      if (!window.paypal) {
        console.log(window.paypal);
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successPay, successDeliver]);
  const { order, loading } = useSelector((state) => state.userGetOrder);

  const successpaymentHander = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
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
                {order.shippingAddress.address} {order.shippingAddress.city}{" "}
                {order.shippingAddress.country}
              </p>
              {order.is_Deliveried ? (
                <Alert variant="info">Delivered on {order.delivered_At}</Alert>
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
              {order.is_Paid ? (
                <Alert variant="info">Paid on {order.paid_At}</Alert>
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

              {!order.is_Paid && (
                <ListGroup.Item>
                  {loadingPay && (
                    <Spinner
                      animation="border"
                      role="status"
                      style={{
                        height: "100px",
                        width: "100px",
                        margin: "auto",
                        display: "block",
                      }}
                    >
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
                  {sdkReady ? (
                    <Spinner
                      animation="border"
                      role="status"
                      style={{
                        height: "100px",
                        width: "100px",
                        margin: "auto",
                        display: "block",
                      }}
                    >
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    <PayPalButton
                      amount={order.total_Price}
                      onSuccess={successpaymentHander}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDeliver && (
              <Spinner
                animation="border"
                role="status"
                style={{
                  height: "100px",
                  width: "100px",
                  margin: "auto",
                  display: "block",
                }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            {userInfo && userInfo.is_Admin && !order.is_Deliveried && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                  style={{
                    height: "100%",
                    width: "100%",
                    transform: "translateY(-10px)",
                  }}
                >
                  Mark As Deliver
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
