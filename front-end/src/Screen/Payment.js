import React from "react";
import "./../static/shipping.css";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "./../action/cartActions";
import Checkout from "./../components/Checkout";
function Payment({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  if (!shipping.address || !shipping.city || !shipping.country) {
    history.push("/shipping");
  }
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <Checkout step1 step2 step3></Checkout>
      <Form.Group>
        <Form.Label as="legend">
          Select Method Payment
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              name="paymentMethod"
              checked
              id="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Label>
      </Form.Group>
      <Form onSubmit={submitHandle}>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Payment;
