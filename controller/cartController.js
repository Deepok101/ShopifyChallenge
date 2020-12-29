const Image = require("../models/Image");
const User = require("../models/User")

const getCart = async (req, res) => {
    try {
        User.findOne({username: req.body.username}, (e, u) => {
          let shoppingCart = u.shoppingcart
          let total = shoppingCart.total      
          Image.find({
            '_id': { $in: shoppingCart.images}}).then((images) => res.status(200).send({images: images, total: total}))
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({error: "some error occured"})
    }
}

const addToCart = async (req, res) => {
    try {
        User.findOne({username: req.body.username}, (e, u) => {
          let shoppingCart = u.shoppingcart
          if(!shoppingCart.images.includes(req.body.imageId)){
            shoppingCart.images.push(req.body.imageId)
            if(req.body.price){
              shoppingCart.total = shoppingCart.total + req.body.price
            }
            u.save()
            res.status(200).send({msg: "Added image to cart"})
          } else {
            res.status(200).send({msg: "Item already in cart"})
          }

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "some error occured"})
    }
}

module.exports = {
    getCart,
    addToCart
}