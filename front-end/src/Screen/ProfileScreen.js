import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const StyleForm = styled.div`
  h3 {
    margin-top: 20px;
    margin-bottom: 40px;
    font-weight: 900;
  }
  #name {
    margin-bottom: 20px;
  }
  #footer {
  }
  .py-3 {
    margin-top: 20px;
  }
  font-size: 15px;
`;

const StyleTable = styled.div`
  h3 {
    margin-top: 20px;
    margin-bottom: 40px;
    font-weight: 900;
  }
  button {
    padding: 5px;
    width: 80px;
    background-color: #000;
    text-color: #1a1a1a;
    margin: auto;
    margin-left: 14px;
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
      <Col md={3}>
        <StyleForm>
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
        </StyleForm>
      </Col>
      <Col md={8} style={{ marginLeft: "30px" }}>
        <StyleTable>
          <h3>My orders</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th style={{ width: "10%", color: "#000" }}>ID</th>
                <th style={{ width: "20%", color: "#000" }}>DATE</th>
                <th style={{ width: "15%", color: "#000" }}>TOTAL</th>
                <th style={{ width: "35%", color: "#000" }}>PAID</th>
                <th style={{ width: "20%", color: "#000" }}>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button>Detail</Button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button>Detail</Button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button>Detail</Button>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button>Detail</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </StyleTable>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
