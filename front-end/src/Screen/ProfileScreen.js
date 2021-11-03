import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  h3 {
    margin-top: 20px;
    margin-bottom: 40px;
  }
  #name {
    margin-bottom: 20px;
  }
  #footer {
  }
  Button {
    margin-top: 30px;
  }
  .py-3 {
    margin-top: 20px;
  }
`;

function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email }, { password });
  };

  return (
    <Row>
      <Col md={4}>
        <Styles>
          <h3>User profile</h3>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="name"
            ></Form.Control>
          </Form.Group>

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

            <Button variant="primary" type="submit">
              Update profile
            </Button>
          </Form>
        </Styles>
      </Col>
      <Col md={8}>
        <Styles>
          <h3>My orders</h3>
          <Row style={{ background: "#808080" }}>
            <Col md={1}>
              <h5>Id</h5>
            </Col>
            <Col md={2}>
              <h5>Date</h5>
            </Col>
            <Col md={2}>
              <h5>Total</h5>
            </Col>
            <Col md={4}>
              <h5>Paid</h5>
            </Col>
            <Col md={2}>
              <h5>Delivered</h5>
            </Col>
          </Row>
          <Row style={{ background: "#ffffff" }}>
            <Col md={1} controlId="id">
              a
            </Col>
            <Col md={2} controlId="date">
              b
            </Col>
            <Col md={2} controlId="total">
              c
            </Col>
            <Col md={4} controlId="paid">
              d
            </Col>
            <Col md={2} controlId="delivered">
              e
            </Col>
          </Row>
        </Styles>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
