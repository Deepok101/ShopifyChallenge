import React, {useContext, useState} from "react";
import AuthContext from '../context/authContext'
import ImageGallery from "../component/ImageGallery";
import Navbar from "../component/Navbar"
import ShoppingCart from '../component/ShoppingCart'

const ShopPage = (props) => {
    const [cart, setCart] = useState([])
    const [show, setShow] = useState(false)
    const [myShop, setMyShop] = useState(false)
    const [total, setTotal] = useState(0)
    const handleClose = () => setShow(false);

    const getCart = () => {
      const body = {
        username: props.username
      }
      fetch('/user/cart', {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: { 'Content-type': 'application/json' }
      }).then(res => res.json()).then(res => {console.log(res); setCart(res.images); setTotal(res.total); setShow(true)})
    }

    return (
      <div>
        <ShoppingCart show={show} images={cart} handleClose={handleClose} total={total}/>
        <Navbar username={props.username} getCart={getCart} setMyShop={setMyShop}/>
        
        <div className="container">
        {myShop ? <h1>My Shop</h1>: <h1>Shop</h1>}
          <ImageGallery username={props.username} myShop={myShop}/>
        </div>


      </div>

    );
}
export default ShopPage;