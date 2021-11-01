import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useSelector, useDispatch } from "react-redux";
import { listProductDetail } from "../action/productAction";
import { addToCart } from "../action/cartActions";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { error, loading, product } = useSelector(
    (state) => state.productDetail
  );
  const AddToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  useEffect(() => {
    dispatch(listProductDetail(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <div>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={product.image}
            alt={product.name}
            className="imageProduct"
          ></Image>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.num_Reviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price:${product.price}</ListGroup.Item>
            <ListGroup.Item>Description:{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.count_Stock > 0 ? "Instock" : "Out of stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.count_Stock > 0 && (
                <ListGroup.Item>
                  <Row xs="auto" className="my-1">
                    <Col>Quantity: </Col>
                    <Col style={{ marginLeft: "50px" }}>
                      <Form.Control
                        as="select"
                        defaultValue={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(product.count_Stock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={AddToCartHandler}
                  className="btn-block"
                  disabled={product.count_Stock === 0}
                  style={{ width: "100%" }}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
