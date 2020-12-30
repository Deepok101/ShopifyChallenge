import React, {useEffect, useState} from "react";
import AuthContext from '../context/authContext'
import ImageGallery from "../component/ImageGallery";
import Navbar from "../component/Navbar"
import ShoppingCart from '../component/ShoppingCart'

const ShopPage = (props) => {
    const [cart, setCart] = useState([])
    const [credits, setCredits] = useState(props.credits)
    const [show, setShow] = useState(false)
    // myShop is a boolean indicating that we want to only display pictures belonging to the user.
    // In response, this will make a get request of only the user's pictures.
    const [myShop, setMyShop] = useState(false)
    const [total, setTotal] = useState(0)
    const [error, setError] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)

    useEffect(() => initCart(), []);

    const handleClose = () => {
      setShow(false);
      setError(null)
    }

    const initCart = () => {
      fetch(`/user/${props.username}/cart`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {console.log(res); setCart(res.images); setTotal(res.total);})
    }

    const getCart = () => {
      fetch(`/user/${props.username}/cart`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {console.log(res); setCart(res.images); setTotal(res.total); setShow(true)})
    }

    const addToCart = (imageId, price) => {
      const body = {
        'imageId' : imageId,
      }
  
      fetch(`/user/${props.username}/cart/add`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {console.log(res); setCart(res.images)})
    }

    const resetCart = () => {
      const body = {
      }
  
      fetch(`/user/${props.username}/cart/reset`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {console.log(res); setCart(res.images); setTotal(res.total)})  
    }

    const purchase = () => {
      fetch(`/user/${props.username}/cart/checkout`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({}),
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {
        if(res.error){
          setError(res.error)
        } else {
          console.log(res.msg)
          setCart([])
          setTotal(0)
          setCredits(res.credits)
        }
      })
    }

    const addCredits = () => {
      const body = {
        amount: 10
      }
      fetch(`/user/${props.username}/credits/add`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {
        if(res.error){
          setError(res.error)
        } else {
          setCredits(res.credits)
        }
      }) 
    }

    return (
      <div>
        <ShoppingCart show={show} images={cart} handleClose={handleClose} purchase={purchase} error={error} total={total} username={props.username} resetCart={resetCart}/>
        <Navbar username={props.username} getCart={getCart} addCredits={addCredits} setMyShop={setMyShop} credits={credits} cartSize={cart.length} setUploadedImage={setUploadedImage}/>
        
        <div className="container">
        {myShop ? <h1>My Shop</h1>: <h1>Shop</h1>}
          <ImageGallery username={props.username} myShop={myShop} addToCart={addToCart} uploadedImage={uploadedImage}/>
        </div>


      </div>

    );
}
export default ShopPage;