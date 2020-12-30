import React, { useState, useEffect } from "react";
import { Card, Button, CardDeck, Modal } from "react-bootstrap";
import axios from "axios";

const ImageCarousel = (props) => {
  const [images, setImages] = useState(null);
  const [show, setShow] = useState(false)
  const [editValue, setEditValue] = useState(0)
  const [imageToEdit, setImageToEdit] = useState(null)
  const [editMode, setEditMode] = useState("")
  const [error, setError] = useState(false);

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

  const setImage = async (imageId, value) => {
    switch(editMode){
      case "Inventory":
        setInventory(imageId, value)
        break
      case "Discount":
        setDiscount(imageId, value)
        break
    }
  }

  const setInventory = (imageId, inventory) => {
    console.log(imageId)
    const body = {
      'username' : props.username,
      'inventory': inventory
    }

    fetch(`/image/${imageId}/setInventory`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    }).then(res => res.json()).then(res => {
      if (res.error){
        setError(true)
      } else {
        console.log(res)
        getImage()
      }
    })
  }

  const setDiscount = (imageId, discount) => {
    const body = {
      'username' : props.username,
      'discount': discount
    }

    fetch(`/image/${imageId}/setDiscount`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    }).then(() => getImage())
  }

  const deleteImage = (imageId) => {
    const body = {
      'username' : props.username,
    }

    fetch(`/image/${imageId}/delete`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    }).then(res => res.json()).then(() => getImage())

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
                    {`Discounted Price ${image.realprice}$`}
                  </Card.Text>
                  <Card.Text>
                    {image.inventory != undefined  ? `Inventory: ${image.inventory}`: 'Inventory: Unlimitted'}
                  </Card.Text>
                  {props.myShop == false ? 
                    image.belongsTo != props.username && (image.inventory > 0 || image.inventory == undefined) ? 
                      <Button variant="primary" onClick={() => props.addToCart(image._id, image.price)}>Add to cart</Button>
                      : <Button disabled variant="primary" onClick={() => props.addToCart(image._id)}>Add to cart</Button>
                  : null}
                  
                  {props.myShop == true ? 
                  <div>
                    <Button style={{marginRight:5}} variant="primary" onClick={() => {setImageToEdit(image._id); setEditMode("Inventory"); handleShow()}}>Set Inventory</Button>
                    <Button variant="primary" onClick={() => {setImageToEdit(image._id); setEditMode("Discount"); handleShow()}}>Set Discount</Button>
                    <Button variant="danger" onClick={() =>{deleteImage(image._id)} }>Delete</Button>
                  </div>
                  : null}
                </Card.Body>
              </Card>
            );
          })
        : <div></div>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set {editMode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
              <label htmlFor="desc">{editMode}</label>
              <input
                onChange={(e) => setEditValue(e.target.value)}
                type="number"
                value={editValue}
                min={0}
                max={100}
                className="form-control"
                required
                id="desc"
              />
            </div>
            <button onClick={() => {setImage(imageToEdit, editValue); handleClose()}} className="btn btn-primary">
              Submit
            </button>
            {error ? (
              <div className="text-danger">
                {" "}
                Some error occured uploading the file{" "}
              </div>
            ) : null}
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