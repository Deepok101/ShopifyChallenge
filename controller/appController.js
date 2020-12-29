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
        discount: req.body.discount
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
    let image = await Image.findById(req.body.id);
    image.inventory = req.body.inventory
    image.save()
    return res.status(200).json({ msg: "Inventory edited"});
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const deleteImage = async (req, res) => {
  try {
    Image.findByIdAndDelete(req.id, (err, docs) => {
      if(err){
        console.log(err)
        return res.status(422).json({error: "Invalid ID"})
      }
    })
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
  setInventory
};