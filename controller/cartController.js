const Image = require("../models/Image");
const User = require("../models/User")

const getCart = async (req, res) => {
    try {
        let u = await User.findOne({username: req.params.username})
        let shoppingCart = u.shoppingcart
        let images = await Image.find({'_id': { $in: shoppingCart.images}})
        let total = 0
        images.forEach(im => total += im.realprice)
        shoppingCart.total = total
        await u.save()
        res.status(200).send({images: images, total: total})

    } catch (error) {
        console.log(error)
        res.status(500).send({error: "some error occured"})
    }
}

const addToCart = async (req, res) => {
  // Note that a user can only by one image once. The user cannot currently add multiple of the same image to BUY.
    try {
        let u = await User.findOne({username: req.params.username})
        let shoppingCart = u.shoppingcart
        if(!shoppingCart.images.includes(req.body.imageId)){
          shoppingCart.images.push(req.body.imageId)
          let i = await Image.findById(req.body.imageId)
          if(u.username == i.belongsTo){
            return res.status(500).json({error: "Cannot purchase item that belongs to you"})
          }
          if(i.price){
            shoppingCart.total = shoppingCart.total + i.realprice
          }
          await u.save()
          let images = await Image.find({'_id': { $in: shoppingCart.images}})
          res.status(200).send({msg: "Added image to cart", images: images, total: shoppingCart.total})
        } else {
          let images = await Image.find({'_id': { $in: shoppingCart.images}})
          res.status(200).send({msg: "Item already in cart", images: images, total: shoppingCart.total})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "some error occured"})
    }
}

const resetCart = async (req, res) => {
  // Note that a user can only by one image once. The user cannot currently add multiple of the same image to BUY.
    try {
        let u = await User.findOne({username: req.params.username})
        let shoppingCart = u.shoppingcart
        shoppingCart.images = []
        shoppingCart.total = 0
        await u.save()
        return res.status(200).json({msg: "cart successfully reset", images: shoppingCart.images, total: shoppingCart.total})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "some error occured"})
    }
}

const checkoutUser = async (req, res) => {
  try {
    var username = req.params.username;
    let user = await User.findOne({username: username})
    if (user) {
      let shoppingCart = user.shoppingcart
      var total = 0
      let images = await Image.find({'_id': { $in: shoppingCart.images}})

      images.forEach(im => {
        if(im.inventory > 0 || im.inventory == undefined){
          total += im.realprice
          console.log(im.realprice)
        }
      })

      if(user.credits >= total){
        user.credits -= total
        images.forEach(async im => {
          if(im.inventory > 0){
            let ownerUsername = im.belongsTo
            let owner = await User.findOne({username: ownerUsername})
            owner.credits += im.realprice
            im.inventory -= 1
            await im.save()
            await owner.save()
          } 
        })
        user.shoppingcart.images = []
        await user.save()
        res.status(200).send({ msg: "Successfully purchased images. Thank you for your business!", credits: user.credits });
      } else {
        res.status(500).send({ error: "User does not have sufficient funds." });
      }

        
    } else {
        console.log("User not found")
        res.status(404).send({ error: "some error occured" });
    }
  } 

  catch (error) {
    console.error(error);
    res.status(500).send({ error: "some error occured" });
  }
}

module.exports = {
    getCart,
    addToCart,
    checkoutUser,
    resetCart
}