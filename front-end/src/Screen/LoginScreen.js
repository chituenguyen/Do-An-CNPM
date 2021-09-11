import React from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email }, { password });
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
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
          Enter
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
