var mongoos = require('mongoose')

mongoos.connect('mongodb+srv://sushmanth:HIGHtech123@cluster0.ztan2dy.mongodb.net/EatMoreDB?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected successfully!')
})
.catch(()=>{
    console.log("Error in connecting to the DB")
})

var FoodItemsSchema = new mongoos.Schema({
    ItemID:{
        type: Number,
        required: true,
        unique: true
    },
    ItemName: {
        type: String,
        required: true,
        unique: true
    },
    ItemCost: {
        type: Number,
        required: true
    },
    ItemCategory: {
        type: String,
        required: true
    },
    ItemImage: {
        type: String,
        required: true
    }
})

var FoodItemsModel = mongoos.model("FoodItems", FoodItemsSchema)

module.exports = FoodItemsModel