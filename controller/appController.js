const Image = require("../models/Image");
const getImages = async (req, res) => {
  try {
    let images = await Image.find({}, " -__v");
    return res.status(200).json({ images, msg: "image info fetched"    });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const getUserImages = async (req, res) => {
  try {
    console.log(req.params.username)
    let images = await Image.find({belongsTo: req.params.username});
    return res.status(200).json({ images, msg: "image info fetched"});
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (req.file && req.file.path) {
      const image = new Image({
        description: req.body.desc,
        url: req.file.path,
        belongsTo: req.body.username,
        title: req.body.title,
        price: req.body.price,
        discount: req.body.discount,
        realprice: req.body.price * (1-(req.body.discount/100))
      });
      await image.save();
      return res.status(200).json({ msg: "image successfully saved" });
    } 
    else {
      console.log(req.file);
      return res.status(422).json({ error: "invalid" });
    }
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const setInventory = async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);
    if(req.body.inventory < 0){
      return res.status(500).json({error: "Inventory cannot be a negative integer"})
    }
    if(Number.isInteger(parseInt(req.body.inventory))){
      image.inventory = req.body.inventory
      await image.save()
      return res.status(200).json({ msg: "Inventory edited"});
    } else {
      return res.status(500).json({error: "Inventory value must be an integer value"})
    }
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const setPrice = async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);
    if(req.body.price < 0){
      return res.status(500).json({error: "Price cannot be a negative value"})
    }
    image.price = req.body.price
    image.realprice = image.price * (1-(image.discount/100))
    await image.save()
    return res.status(200).json({ msg: "Price edited"});
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const setDiscount = async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);
    if (req.body.discount > 100 || req.body.discount < 0){
      return res.status(500).json({ error: "Cannot set discount value below 0% or higher than 100%" });
    }
    
    image.discount = req.body.discount
    image.realprice = image.price * (1-(image.discount/100))
    await image.save()
    return res.status(200).json({ msg: "Discount edited"});
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const deleteImage = async (req, res) => {
  try {
    let username = req.body.username
    let imageId = req.params.id
    await Image.findOneAndDelete({_id: imageId, belongsTo: username})
    return res.status(200).json({ msg: "Successfully deleted user image" }); 
  }
  catch (error){
    console.error(error);
    return res.status(500).json({ error: "some error occured" }); 
  }
}

module.exports = {
  getImages,
  uploadImage,
  getUserImages,
  setInventory,
  setDiscount,
  deleteImage,
  setPrice
};