var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sushmanth:HIGHtech123@cluster0.ztan2dy.mongodb.net/EatMoreDB?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected successfully!')
})
.catch(()=>{
    console.log("Error in connecting to the DB")
})

var CustomerSchemma = new mongoose.Schema({
    CustomerID : {
        type: Number,
        required: true,
        unique: true,
    },
    CustomerFName: {
        type: String,
        required: true,
    },
    CustomerLName: {
        type: String
    },
    CustomerGen: {
        type: String,
        required: true
    },
    CustomerEmail: {
        type: String,
        required: true,
        unique: true
    },
    CustomerPhone: {
        type: Number,
        unique: true,
        required: true
    },
    CustomerCountry: {
        type: String,
        required: true
    },
    CustomerState: {
        type: String,
        required: true
    },
    CustomerCity: {
        type: String,
        required: true
    },
    CustomerAdd: {
        type: String,
        required: true
    },
    CustomerPin: {
        type: Number,
        required: true
    },
    CustomerUserName: {
        type: String,
        required: true,
        unique: true
    },
    CustomerPass: {
        type: String,
        required: true
    },
    CustomerBio: {
        type: String
    }
},
{
    timestamps:{
        createdAt: true,
        updatedAt: true
    }
})

var CustomerModel = mongoose.model("CustomerDetails", CustomerSchemma)

module.exports = CustomerModel;