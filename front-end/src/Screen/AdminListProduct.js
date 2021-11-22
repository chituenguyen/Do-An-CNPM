import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminListOrder } from "./../action/orderAction";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Alert, Table, Spinner } from "react-bootstrap";
import { listProducts } from "./../action/productAction";
import {
  adminCreateNewProductAction,
  adminDeleteProductAction,
} from "../action/adminActions";
import { ADMIN_CREATE_NEW_PRODUCT_RESET } from "../constants/adminConstants";

function AdminListProduct({ history }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  const { success: successDelete } = useSelector(
    (state) => state.adminDeleteProduct
  );
  const { success: successCreate, product: productCreateByAdmin } = useSelector(
    (state) => state.adminCreateNewProduct
  );
  const deleteHandler = (id, token) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      dispatch(adminDeleteProductAction(id, token));
    }
  };
  const createNewProduct = (token) => {
    dispatch(adminCreateNewProductAction(token));
  };
  useEffect(() => {
    if (successCreate) {
      history.push(`/admin/product/edit/${productCreateByAdmin._id}`);
      dispatch({ type: ADMIN_CREATE_NEW_PRODUCT_RESET });
    }
    if (userInfo && userInfo.is_Admin) {
      dispatch(listProducts());
    } else {
      history.push("/login/");
    }
  }, [dispatch, userInfo, successDelete, successCreate]);
  return (
    <div>
      <Row className="align-items-center">
        <Col className="my-3">
          <h1>Products</h1>
        </Col>

        <Col className="text-right">
          <Button
            className="my-3"
            style={{ float: "right" }}
            onClick={() => createNewProduct(userInfo.token)}
          >
            <i className="fas fa-plus">Create Product</i>
          </Button>
        </Col>
      </Row>
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
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.count_Stock}</td>

                <td>
                  <LinkContainer to={`/admin/product/edit/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>

                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id, userInfo.token)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AdminListProduct;
