import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminListOrder } from "./../action/orderAction";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "./../components/FormContainer";
import { Form, Button, Row, Col, Alert, Table, Spinner } from "react-bootstrap";
import { listProducts } from "./../action/productAction";
import {
  adminCreateNewProductAction,
  adminDeleteProductAction,
  adminUpdateProductAction,
} from "../action/adminActions";
import {
  ADMIN_CREATE_NEW_PRODUCT_RESET,
  ADMIN_UPDATE_PRODUCT_RESET,
} from "../constants/adminConstants";
import { listProductDetail } from "../action/productAction";
import { Link } from "react-router-dom";
import axios from "axios";
function AdminEditProduct({ match, history }) {
  const dispatch = useDispatch();
  const product_Id = match.params.id;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { error, loading, product } = useSelector(
    (state) => state.productDetail
  );

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(product.count_Stock);
  const [description, setDescription] = useState(product.description);
  const [uploading, setUploading] = useState(false);
  const adminUpdateProductStore = useSelector(
    (state) => state.adminUpdateProductStore
  );
  const { success: successUpdate } = adminUpdateProductStore;
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      adminUpdateProductAction(
        {
          _id: product._id,
          name,
          brand,
          price,
          category,
          description,
          count_Stock: countInStock,
        },
        userInfo.token
      )
    );
  };
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
      history.push("/admin/products");
    }
    if (userInfo && userInfo.is_Admin) {
    } else {
      history.push("/login");
    }
    if (!product.name || product._id !== Number(product_Id)) {
      dispatch(listProductDetail(product_Id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.count_Stock);
      setDescription(product.description);
    }
  }, [dispatch, product_Id, product, successUpdate, history]);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product._id", product_Id);
    setUploading(true);
    try {
      const config = {
        header: {
          Content_Tpe: "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/adminupload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  return (
    <>
      <Link to="/admin/products" className="btn btn-primary my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

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
          <h3>{error}</h3>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default AdminEditProduct;
