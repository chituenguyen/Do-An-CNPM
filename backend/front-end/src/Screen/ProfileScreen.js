import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { user_get_profile } from "../action/userAction";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import OrderScreen from "./OrderScreen";
import { userGetMyOrder } from "../action/orderAction";

function ProfileScreen({ history }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  dispatch(user_get_profile(userInfo.token));
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const { order } = useSelector((state) => state.userGetMyOrder);
  useEffect(() => {
    if (userInfo) {
      console.log("1");
      dispatch(userGetMyOrder(userInfo.token));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const StyleForm = styled.div`
    h2 {
      margin-top: 20px;
      margin-bottom: 40px;
      font-weight: 900;
      font-size: 25px;
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
    h2 {
      margin-top: 20px;
      margin-bottom: 40px;
      font-weight: 900;
      font-size: 25px;
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

  return (
    <Row>
      <Col md={3}>
        <StyleForm>
          <h2>User profile</h2>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={userInfo.name}
              name="name"
            ></Form.Control>
          </Form.Group>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userInfo.email}
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
          <h2>My orders</h2>
          <Table striped bordered hover variant="red" size="sm">
            <thead>
              <tr style={{ fontSize: "20px" }}>
                <th
                  class="table-danger"
                  style={{ width: "10%", color: "#000", fontSize: "15px" }}
                >
                  ID
                </th>
                <th
                  class="table-danger"
                  style={{ width: "20%", color: "#000", fontSize: "15px" }}
                >
                  DATE
                </th>
                <th
                  class="table-danger"
                  style={{ width: "15%", color: "#000", fontSize: "15px" }}
                >
                  TOTAL
                </th>
                <th
                  class="table-danger"
                  style={{ width: "35%", color: "#000", fontSize: "15px" }}
                >
                  PAID
                </th>
                <th
                  class="table-danger"
                  style={{ width: "20%", color: "#000", fontSize: "15px" }}
                >
                  DELIVERED
                </th>
              </tr>
            </thead>
            <tbody>
              {order.map((order, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{order.create_At}</td>
                  <td>{order.total_Price} $</td>
                  <th>
                    {order.is_Paid ? (
                      order.paidAt
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </th>
                  <td>
                    <LinkContainer to={`/order/${order._id}/`}>
                      <Button variant="light" className="btn-sm">
                        Detail
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </StyleTable>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
