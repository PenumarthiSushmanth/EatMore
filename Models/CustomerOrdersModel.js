var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sushmanth:HIGHtech123@cluster0.ztan2dy.mongodb.net/EatMoreDB?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected successfully!')
})
.catch(()=>{
    console.log("Error in connecting to the DB")
})

var CustOrderSchema = new mongoose.Schema({
    CustomerID : {
        type: Number,
        required: true
    },
    OrderID: {
        type: Number,
        required: true
    },
    OrderDate:{
        type: Date,
        required: true,
        default: new Date()
    },
    Items: {
        type: Object,
        required: true
    },
    ItemsCount: {
        type: Number,
        required: true,
        Min: 1
    },
    TotalAmount: {
        type: Number,
        required: true,
        Min: 100
    },
    OrderStatus: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

var CustOrderModel = new mongoose.model("CustomerOrders", CustOrderSchema);

module.exports = CustOrderModel;