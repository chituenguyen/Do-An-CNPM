import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Alert, Table, Spinner } from "react-bootstrap";
import { adminListUserAction } from "./../action/adminActions";

function AdminListUser({ history }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(adminListUserAction(userInfo.token));
    } else {
      history.push("/login");
    }
  }, [dispatch]);

  const adminListUser = useSelector((state) => state.adminListUser);
  const { loading, users, error } = adminListUser;
  console.log(users);
  return (
    <div>
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
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.is_Admin ? (
                    <i class="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i class="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AdminListUser;
