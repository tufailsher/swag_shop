var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const wishlist = new Schema({
    title: {type : String, default: "Wishlist"},
    user: {type: ObjectId, ref: 'User'},
    products: [{type: ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Wishlist', wishlist);