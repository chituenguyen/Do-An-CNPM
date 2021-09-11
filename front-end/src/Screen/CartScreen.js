import React from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Message,
  Container,
  ListGroupItem,
  Alert,
} from "react-bootstrap";

import '../CartScreen.css'
import Rating from "./../components/Rating";
import products from "../products";

function CartScreen() {
  return (
  <div className="cartScreen">
        <Container>
        <h1 className="heading">Shopping Cart</h1>
          <Row>
            <Col lg={8} md={12} sm={12}>
              { 
              products.map((product) =>(
                <Row className="product__item" key={product._id}>

                <Col className="text-center">
                <Image 
                src={`${product.image}`} 
                style ={{
                  width:'60px'
                }} rounded />
                </Col>

                <Col className="text-center">
                {product.name}
                </Col>
                
                <Col className="text-center">
                ${product.price} 
                </Col>

                <Col className="text-center">
                <form className="product__number">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </form>
                  
               

                </Col>
                
                <Col className="text-center">
                <i class="fas fa-trash"></i>
                </Col>
              </Row>
              ))
              }
              </Col>
            <Col lg={4} md={12} sm ={12}>
              <Card>
               <Card.Body>
                 <Card.Text className="cart__proceed-total">
                   SUBTOTAL (5) ITEMS
                 </Card.Text>
                 <Card.Text>
                   $1000
                 </Card.Text>
               </Card.Body>
              </Card>
              <Card.Footer className="btn__footer">
                <Button className="btn__checkout">PROCEDD TO CHECKOUT</Button>
              </Card.Footer>
            </Col>
          </Row>
        </Container>      
  </div>
  )
}

export default CartScreen;
