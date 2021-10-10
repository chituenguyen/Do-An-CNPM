import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "./../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../action/productAction";
import { Spinner } from "react-bootstrap";

function HomeScreen() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <h1>Lastest products</h1>
      {error ? (
        <h3>{error}</h3>
      ) : loading ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            height: "100px",
            width: "100px",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
