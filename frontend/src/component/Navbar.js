import React, { useState, useEffect } from "react";
import { Navbar, Button, Nav, Badge } from "react-bootstrap";
import Upload from "./Upload";

const NavbarComponent = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Imageify</Navbar.Brand>
      <Navbar.Toggle />
      <Nav className="mr-auto">
        <Nav.Link href="#Shop" onClick={() => props.setMyShop(false)}>Shop</Nav.Link>
        <Nav.Link href="#MyShop" onClick={() => props.setMyShop(true)}>My Shop</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Upload username={props.username}/>
        <Button type="submit" variant="outline-info" style={{marginRight: 10}} onClick={props.getCart} >Shopping Cart <Badge variant="danger">{props.cartSize}</Badge></Button>
        <Button type="submit" variant="outline-info" style={{marginRight: 10}} onClick={props.addCredits}>Add Credits</Button>
        <Navbar.Text style={{marginRight: 10}}>
          Credits: {props.credits}
        </Navbar.Text>
        <Navbar.Text>
          Signed in as: <a href="#login">{props.username}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

