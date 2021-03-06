require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const appRoute = require("./routes/imageRoute");
const app = express();
const path = require('path');
const userRoute = require("./routes/userRoute")

const PORT = process.env.PORT || 5000;
// const publicPath = path.join(__dirname, '..', 'public');

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
}

app.use("/image", appRoute);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("connected to mongo database")).catch((error) => console.error(error));

// app.use("/shoppingCart", shoppingCartRoute)

app.use("/user", userRoute)

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }     
    })  
})

app.listen(PORT, () => console.log(`listening on port : ${PORT}`));