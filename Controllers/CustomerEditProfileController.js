var CustomerDetailsModel = require('../Models/CustomersDetailsModel')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

exports.editProfile = async (req, res)=> {
    var id = req.params.id
    var data = req.body
    try
    {
        var document = await CustomerDetailsModel.findOneAndUpdate({CustomerID: id}, data)
        res.status(200).json({
            status: "Success",
            message: "Data Updated successfully!"
        })
    }catch(ex)
    {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message
        })
    }
}

exports.fetchProfileDetails = async (req, res)=> {
    var id = req.params.id;
    try
    {
        var document = await CustomerDetailsModel.find({CustomerID: id})
        res.status(200).json({
            status: "Success",
            message: "Data Fetched successfully!",
            data: document
        })
    }catch(ex)
    {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message
        })
    }
}

exports.closeAccount = async (req, res)=>{
    var id = req.params.id;
    try
    {
        var document = await CustomerDetailsModel.deleteOne({CustomerID: id})
        res.status(200).json({
            status: "Success",
            message: "Account Deleted successfully!"
        })
    }catch(ex)
    {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message
        })
    }
}