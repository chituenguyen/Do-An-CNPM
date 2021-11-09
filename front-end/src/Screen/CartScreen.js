import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToCart } from "../action/cartActions";

function CartScreen({ match, history, location }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const cart = useSelector((state) => state.cart);
  const products = cart.cartItems;
  const checkout = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <div>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            {products.map((product) => (
              <ListGroup.Item variant="flush" key={product.product._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`${product.product.image}`}
                      style={{
                        width: "60px",
                      }}
                      rounded
                    />
                  </Col>

                  <Col md={3}>{product.product.name}</Col>

                  <Col md={2}>${product.product.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      defaultValue={product.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(product.product._id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(product.product.count_Stock).keys()].map(
                        (x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button type="button" variant="light">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>SubTotal (5) items</h2>
                $1000
              </ListGroupItem>
              <ListGroupItem className="d-grid gap-2">
                <Button
                  type="button"
                  className="btn-block"
                  onClick={() => checkout()}
                >
                  Process To Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
