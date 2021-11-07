import React from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../action/userAction";

const Styles = styled.div`
  h1{
    margin-top:20px;
    margin-bottom:40px;
    font-size:200px
    background:#000754;
  }
  #email {
    margin-bottom: 20px;
  }
  #footer{
    
  }
  Button{
    margin-top:30px;  
  }
  .py-3{
    margin-top:20px;
  }
`;

function LoginScreen({ location, history }) {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email }, { password });
    dispatch(login(email, password));
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  console.log(error);
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <FormContainer>
      <Styles>
        {error ? (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : (
          ""
        )}
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              style={{ textTransform: "none" }}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
        <Row className="py-3">
          <Col id="footer">
            New Customer?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Styles>
    </FormContainer>
  );
}

export default LoginScreen;
