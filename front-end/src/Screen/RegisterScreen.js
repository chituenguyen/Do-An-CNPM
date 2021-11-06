import React from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "./../action/userAction";

const Styles = styled.div`
  h1{
    margin-top:20px;
    margin-bottom:40px;
    font-size:200px
    background:#000754;
  }
  #email, #password, #first_name, #last_name {
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

function RegisterScreen({ location, history }) {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [first_name, set_firstName] = useState("");
  const [last_name, set_lastName] = useState("");
  const [mess, setMess] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      { first_name },
      { last_name },
      { email },
      { password },
      { confirm_password }
    );
    console.log(password === confirm_password);
    if (password !== confirm_password) {
      setMess("Your password is not correct");
    } else {
      console.log(1);
      dispatch(register(first_name, last_name, email, password));
    }
  };
  // const userLogin = useSelector((state) => state.userLogin);
  // const { error, loading, userInfo } = userLogin;
  // console.log(error);
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <FormContainer>
      <Styles>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="first_name">
            <Form.Label>Your First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={first_name}
              onChange={(e) => set_firstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="last_name">
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Last name"
              value={last_name}
              onChange={(e) => set_lastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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

          <Form.Group controlId="confirm_password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              value={confirm_password}
              onChange={(e) => set_confirm_password(e.target.value)}
              name="confirm_password"
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </Styles>
    </FormContainer>
  );
}

export default RegisterScreen;
