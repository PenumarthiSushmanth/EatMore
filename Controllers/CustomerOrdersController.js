const CustomerOrdersModel = require('../Models/CustomerOrdersModel')
var OrderIDModel = require('../Models/IDGenerationModel')
var FoodItemsModel = require('../Models/FoodItemsModel')


const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

exports.postingOrderDetails = async (req, res) => {

    var OrderID;
    var formdata = req.body;

    try {
        OrderIDModel.findOneAndUpdate({ idName: "Orderautoincr" }, { "$inc": { "seq": 1 } }, { new: true }, async (err, doc) => {
            if (doc == null) {
                const newval = new OrderIDModel({ idName: "Orderautoincr", seq: 101 });
                newval.save()
                OrderID = 101;
            } else {
                OrderID = doc.seq;
            }

            var data = {
                CustomerID: req.body.CustomerID,
                OrderID: OrderID,
                Items: req.body.Items,
                ItemsCount: req.body.ItemsCount,
                TotalAmount: req.body.TotalAmount,
            }
            await CustomerOrdersModel.create(data, (err, document) => {
                if (!err) {
                    res.status(200).json({
                        status: "Success",
                        message: "Data posted successfully!",
                        data: document
                    })
                } else {
                    res.status(400).json({
                        status: "Failed",
                        message: err.message
                    })
                }
            })
        })

    } catch (ex) {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}

exports.currentOrders = async (req, res) => {
    var customerId = req.params.id;
    try {
        var sort = { OrderID: -1 };
        var document = await CustomerOrdersModel.find({ $and: [{ CustomerID: customerId, OrderStatus: { $in: [0, 1] } }] }).sort(sort)
        res.status(200).json({
            status: "Success",
            data: document
        })
    } catch (ex) {
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}

exports.previousOrders = async (req, res) => {
    var customerId = req.params.id;
    try {
        var sort = { OrderID: -1 };
        var document = await CustomerOrdersModel.find({ $and: [{ CustomerID: customerId, OrderStatus: 2 }] }).sort(sort)
        res.status(200).json({
            status: "Success",
            data: document
        })
    } catch (ex) {
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}

exports.getFoodItems = async (req, res) => {
    try {
        var document = await FoodItemsModel.find()
        res.status(200).json({
            status: "Success",
            data: document
        })
    } catch (ex) {
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}