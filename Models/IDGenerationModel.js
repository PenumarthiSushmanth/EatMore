var mongoos = require('mongoose')

mongoos.connect('mongodb+srv://sushmanth:HIGHtech123@cluster0.ztan2dy.mongodb.net/EatMoreDB?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected successfully!')
})
.catch(()=>{
    console.log("Error in connecting to the DB")
})

var IDSchema = new mongoos.Schema({
    idName: {
        type: String
    },
    seq: {
        type: Number
    }
})

var CustomerIDModel = mongoos.model("CustomerIDGeneration", IDSchema)

module.exports = CustomerIDModel;