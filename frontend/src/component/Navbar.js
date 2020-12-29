import React, { useState, useEffect } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
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
        <Button type="submit" variant="outline-info" style={{marginRight: 10}} onClick={props.getCart}>Shopping Cart</Button>
        <Navbar.Text>
          Signed in as: <a href="#login">{props.username}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

