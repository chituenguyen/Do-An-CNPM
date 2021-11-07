import React from "react";
import "./../static/shipping.css"
//import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../action/userAction";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
function ShippingScreen() {

// const handleSubmit=(e) => {
//   e.preventDefault();
//   console.log("ahihi");

// }

  return <FormContainer>

    <div class="loader">
      <div class="loader_content"></div>
    </div>

    <div class="main_content">
    <div class="heading_shipping heading">
        <h1 >Shipping</h1>
        <img src="https://www.pngitem.com/pimgs/m/479-4796343_free-shipping-png-fast-shipping-icon-png-transparent.png" height='40 em'/>
    </div>
      
       {/* <Form onSubmit={handleSubmit}>*/}
       <Form>
          <Form.Group as={Row} className="mb-3 title_shiping" controlId="validationCustom01">
            <Form.Label column sm="3">Receiver's Name:</Form.Label>
            <Col sm='9'>
            <Form.Control
              required
              type="text"
              placeholder="Enter Receiver's Name"
              defaultValue=""
            />
          {/*  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 title_shiping" controlId="formHorizontalEmail">
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="email" placeholder="Enter email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 title_shiping" controlId="delivery_location">
        <Form.Label column sm="3">Delivery location:</Form.Label>
        <Col sm='9'>
        <Form.Control
          required
          type="text"
          placeholder="Where do you get delivery?"
          defaultValue=""
        />
      {/*  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
        </Col>
      </Form.Group>

   
      

          <Button variant='primary' type="submit" href='/order'>Ship now!</Button>
      </Form>  
    </div>

    <div class="loader-wrapper">
      <span class="loader"><span class="loader-inner"></span></span>
    </div>
  


  </FormContainer>;
}

export default ShippingScreen;
