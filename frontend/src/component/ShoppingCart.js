import React, { useState, useContext } from "react";
import { Modal, Image, Button, } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";

const ShoppingCart = (props) => {

  return (
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Shopping Cart</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {props.images.map(im => 
        <div>
          <Image src={im.url} width={200} height={200}/>
          <p>{im.price != "" ? `${im.price}$`: "Free"}</p>
        </div>)
        }
        <p>
          Total: {props.total}$
        </p>
        {props.error ? (
        <p className="text-danger">
          {props.error}
        </p>
      ) : null}
    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={props.purchase}>
        Checkout
      </Button>
      <Button variant="danger" onClick={props.resetCart}>
        Reset
      </Button>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>

    );
}
export default ShoppingCart;