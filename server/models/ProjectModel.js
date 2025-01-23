const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    creator:{
     type:String
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bhk: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    Acre: {
        type: String
    },
    status: {
        type: String,
        enum: ['available', 'soldout'],
        default: 'available'
    },
    year: {
        type: Number
    },  
    listingPhotoPaths: [{ type: String }],
    view:{
        type:Number,
        default:0
    },
    balcony:{
        type:Boolean,
        default:false,
        
    },
    terrace:{
        type:Boolean,
        default:false,
        
    },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
