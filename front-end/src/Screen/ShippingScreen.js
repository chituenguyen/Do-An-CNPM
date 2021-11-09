import React from "react";
import "./../static/shipping.css";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "./../action/cartActions";
import Checkout from "./../components/Checkout";
function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shipping } = cart;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });
  const [address, setAddress] = useState(
    shipping.address ? shipping.address : ""
  );
  const [city, setCity] = useState(shipping.city ? shipping.city : "");
  const [country, setCountry] = useState(
    shipping.country ? shipping.country : ""
  );
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, country }));
    history.push("/placeorder");
  };
  return (
    <div>
      {loading ? (
        <div class="loader-wrapper">
          <span class="loader">
            <span class="loader-inner"></span>
          </span>
        </div>
      ) : (
        <FormContainer>
          <Checkout step1 step2></Checkout>
          <Form onSubmit={submitHandle}>
            <h1>Shipping</h1>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your address"
                value={address ? address : ""}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your city"
                value={city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your country"
                value={country ? country : ""}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </div>
  );
}

export default ShippingScreen;
