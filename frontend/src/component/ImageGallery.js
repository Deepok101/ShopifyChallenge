import React, { useState, useEffect } from "react";
import { Card, Button, CardDeck, Modal, Badge } from "react-bootstrap";

const ImageCarousel = (props) => {
  const [images, setImages] = useState(null);
  const [show, setShow] = useState(false)
  const [editValue, setEditValue] = useState(0)
  const [imageToEdit, setImageToEdit] = useState(null)
  const [editMode, setEditMode] = useState("")
  const [error, setError] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {setShow(false); setError(false)};

  useEffect(() => {
    getImage();
  }, [props.myShop, props.uploadedImage]);

  const getImage = async () => {
    if (props.myShop == false){
      fetch("/image/images", {
        method: 'GET',
      }).then(res => res.json()).then(res => {
        if (res.error){
          setError(true)
        } else {
          console.log(res)
          setImages(res.images);
        }
      })        
    } else if (props.myShop == true) {
      fetch(`/image/images/${props.username}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {
        if (res.error){
          setError(res.error)
        } else {
          setImages(res.images);
        }
      })     
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
      case "Price":
        setPrice(imageId, value)
        break
    }
  }

  const setInventory = (imageId, inventory) => {
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
        setError(res.error)
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
    }).then(res => res.json()).then(res => {
      if(res.error){
        setError(res.error)
      } else {
        getImage()
      }
    })
  }

  const setPrice = (imageId, price) => {
    const body = {
      'price': price
    }

    fetch(`/image/${imageId}/setPrice`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' }
    }).then(res => res.json()).then(res => {
      if(res.error){
        setError(res.error)
      } else {
        getImage()
      }
    })
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
                  {image.belongsTo == props.username && props.myShop == false ? <Badge variant="info" style={{display: "inline-block"}}>This is your product</Badge>: null}
                  {image.inventory == 0 && props.myShop == false? <Badge variant="warning" style={{display: "inline-block"}}>No inventory</Badge>: null}
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
                    {image.inventory != undefined  ? `Inventory: ${image.inventory}`: 'Inventory: Unlimited'}
                  </Card.Text>
                  {props.myShop == false ? 
                    image.belongsTo != props.username && (image.inventory > 0 || image.inventory == undefined) ? 
                      <Button variant="primary" onClick={() => props.addToCart(image._id, image.price)}>Add to cart</Button>
                      : <Button disabled variant="primary" onClick={() => props.addToCart(image._id)}>Add to cart</Button>
                  : null}
                  
                  {props.myShop == true ? 
                  <div>
                    <Button style={{marginRight:5, marginTop: 5}} variant="primary" onClick={() => {setImageToEdit(image._id); setEditMode("Inventory"); handleShow()}}>Set Inventory</Button>
                    <Button style={{marginRight:5, marginTop: 5}} variant="primary" onClick={() => {setImageToEdit(image._id); setEditMode("Discount"); handleShow()}}>Set Discount</Button>
                    <Button style={{marginRight:5, marginTop: 5}} variant="primary" onClick={() => {setImageToEdit(image._id); setEditMode("Price"); handleShow()}}>Set Price</Button>
                    <Button style={{marginRight:5, marginTop: 5}} variant="danger" onClick={() =>{deleteImage(image._id)} }>Delete</Button>
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
                {error}{" "}
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