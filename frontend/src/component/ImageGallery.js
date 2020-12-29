import React, { useState, useEffect } from "react";
import { Card, Button, CardDeck, Modal } from "react-bootstrap";
import axios from "axios";

const ImageCarousel = (props) => {
  const [images, setImages] = useState(null);
  const [show, setShow] = useState(false)
  const [inventoryVal, setInventoryVal] = useState(0)
  const [imageToEdit, setImageToEdit] = useState(null)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getImage();
  }, [props.myShop]);

  const getImage = async () => {
    try {
      if (props.myShop == false){
        let { data } = await axios.get("/image/images");
        setImages(data.images);
        console.log(data.images)
      } else if (props.myShop == true) {
        let { data } = await axios.get(`/image/images/${props.username}`);
        setImages(data.images);
        console.log(data.images)   
      }

    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (imageId, price) => {
    const body = {
      'username' : props.username,
      'imageId' : imageId,
      'price': price
    }

    fetch('/user/cart/add', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    })
  }

  const setInventory = (imageId, inventory) => {
    console.log(imageId)
    const body = {
      'username' : props.username,
      'id' : imageId,
      'inventory': inventory
    }

    fetch('/image/setInventory', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    })
  }

  return (
    <CardDeck>
      {images
        ? images.map((image) => {
            return (
              <Card style={{ minWidth: '30%', flexGrow: 0, marginTop: 20}}>
                <Card.Img variant="top" key={image._id} src={image.url} height={300} width={300}/>
                <Card.Body>
                  <Card.Title>{image.title}</Card.Title>
                  <Card.Text>
                    {image.description}
                  </Card.Text>
                  <Card.Text>
                    {`Price ${image.price}$`}
                  </Card.Text>
                  <Card.Text>
                    {`Discount ${image.discount}%`}
                  </Card.Text>
                  <Card.Text>
                    {image.inventory ? `Inventory: ${image.inventory}`: 'Inventory: Unlimitted'}
                  </Card.Text>
                  {image.belongsTo != props.username ? <Button variant="primary" onClick={() => addToCart(image._id, image.price)}>Add to cart</Button>: <Button disabled variant="primary" onClick={() => addToCart(image._id)}>Add to cart</Button>}
                  {props.myShop == true ? <Button variant="primary" onClick={() => {setImageToEdit(image._id); handleShow()}}>Set Inventory</Button>: null}
                </Card.Body>
              </Card>
            );
          })
        : <div></div>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
              <label htmlFor="desc">Inventory</label>
              <input
                onChange={(e) => setInventoryVal(e.target.value)}
                type="number"
                value={inventoryVal}
                className="form-control"
                required
                id="desc"
              />
            </div>
            <button onClick={() => {setInventory(imageToEdit, inventoryVal); handleClose()}} className="btn btn-primary">
              Submit
            </button>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </CardDeck>
  );
};

export default ImageCarousel;