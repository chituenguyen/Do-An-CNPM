import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminListOrder } from "./../action/orderAction";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Alert, Table, Spinner } from "react-bootstrap";
function AdminListOrder({ history }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      dispatch(adminListOrder(userInfo.token));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);
  const { order, loading, error } = useSelector(
    (state) => state.adminListOrder
  );
  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
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
      ) : error ? (
        <Alert variant="danger">You do not have permisson this action</Alert>
      ) : (
        <Table striped bordeded hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>

          <tbody>
            {order.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.user.name}</td>
                <td>{order.create_At}</td>
                <td>${order.total_Price}</td>
                <td>
                  {order.is_Paid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.is_Delivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

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
      )}
    </div>
  );
}

export default AdminListOrder;
