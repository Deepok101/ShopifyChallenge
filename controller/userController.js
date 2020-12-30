const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ShoppingCart = require("../models/ShoppingCart");
const Image = require("../models/Image");
const e = require("express");

const loginUser = async (req, res1) => {
  try {
    var user = req.body.username;
    var pass = req.body.password;

    User.findOne({username: user}, function(error, result){
        if (result) {
            bcrypt.compare(pass, result.password, (err, res)=> {
                if (res){

                    jwt.sign({user: result}, 'secretKey', (err, token)=>{
                        res1.status(200).send({"token": token, "result": result, "session": true});
                    })
                } else {
                    console.log("Wrong password")
                    res1.status(404).send({ error: "some error occured" });
                }
            })
        } else {
            console.log("User not found")
            res1.status(404).send({ error: "some error occured" });
        }
    })
  } 
  catch (error) {
    console.error(error);
    return res1.status(500).json({ error: "some error occured" });
  }
};

const registerUser = async (req, res) => {
  try {
    var username = req.body.username;
    var password = req.body.password;

    bcrypt.hash(password, 8, (err, hash)=>{
        const newUser = new User({
            username: username,
            password: hash,
            shoppingcart: {images: [], total: 0},
            credits: 0
        })
        
        newUser.save().then(() => {
          () => res.status(200).send({msg: "successfully registered"})
        })
        
    })
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const getUserCredits = async (req, res) => {
  try {
    var username = req.params.username;
    let user = await User.findOne({username: username})
    if (user) {
      res.status(200).send({ credits: user.credits });
    } else {
      console.log("User not found")
      res.status(404).send({ error: "User not found" });
    }
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "some error occured" });
  }

}

const addUserCredits = async (req, res) => {
  try {
    var username = req.params.username;
    let amountToAdd = req.body.amount
    let user = await User.findOne({username: username})
    if (user) {
      user.credits += amountToAdd
      await user.save()
      res.status(200).send({ credits: user.credits});
    } else {
      console.log("User not found")
      res.status(404).send({ error: "User not found" });
    }
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "some error occured" });
  }

}

module.exports = {
  loginUser,
  registerUser,
  addUserCredits,
  getUserCredits,

};