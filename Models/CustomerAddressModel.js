var mongoos = require('mongoose')

mongoos.connect('mongodb+srv://sushmanth:HIGHtech123@cluster0.ztan2dy.mongodb.net/EatMoreDB?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected successfully!')
})
.catch(()=>{
    console.log("Error in connecting to the DB")
})

var AddressSchema = new mongoos.Schema({
    Country: {
        type: String
    },
    State:{
        type: String
    },
    City: {
        type: String
    },
    Pincode: {
        type: Number
    }
})

var AddressModel = mongoos.model("Address", AddressSchema)

module.exports = AddressModel