
const PortPath = 5000;

var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Connect to mongoose
mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./models/product');
var WishList = require('./models/wish-list');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/product', async function (req, res) {
    try {
        var products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: "Could not fetch products" });
    }
});

app.get('/wishlist', async function (req, res) {
    try {
        var wishlists = await WishList.find({}).populate({ path: 'products', model: 'Product' }).exec();
        res.send(wishlists);
    } catch (error) {
        res.status(500).send({ error: "Could not fetch wishlists" });
    }
});

app.post('/product', async function (req, res) {
    try {
        var product = new Product();
        product.title = req.body.title;
        product.price = req.body.price;
        await product.save();
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: "Could not save product" });
    }

});
app.post('/wishlist', async function (req, res) {
    console.log("🚀 ~ e:", req.body);
    
    try {
        var wishlist = new WishList();
        wishlist.title = req.body.title;
         await wishlist.save();
        res.send(wishlist);
    } catch (error) {
        console.log("🚀 ~ error:", error)
        res.status(500).send({ error: "Could not create wishlist" });
    }
});


app.put('/wishlist/product/add', async function (req, res) {
    try {
        // let wishlist = await WishList.find({});
   
       let product =  await Product.findById( req.body.productId );

     let wishList =    await WishList.findByIdAndUpdate( req.body.wishListId, {products: product}, { upsert: true });
        await wishList.save();
        res.send({message : 'Successfully added to wishlist'});
    } catch (error) {
        console.log("🚀 ~ catch:", error)        

        res.status(500).send({ error: "Your Product could'nt be add" });
    }
});

app.listen(PortPath, function () {
    console.log("🚀 ~ app.listen ~ PortPath:", PortPath)

});

app.get('/', function (req, res) {
    res.send('hello world');
});
