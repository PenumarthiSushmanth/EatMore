var CustomerDetailsModel = require('../Models/CustomersDetailsModel')
var AddressModel = require('../Models/CustomerAddressModel')
var CustomerIDModel = require('../Models/IDGenerationModel')

const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(cors())

exports.checkDuplicatePhone = async (req, res)=>{
    var phone = req.params.phone;
    try
    {
        var doc = await CustomerDetailsModel.find({CustomerPhone: phone})
        res.status(200).json({
            status: "Success",
            message: "Records Found!",
            data: doc
        })
    }catch(ex)
    {
        res.status(400).json({
            status: "Failed",
            message: ex.message
        })
    }
}

exports.checkDuplicateUsername = async (req, res)=>{
    var uname = req.params.uname;
    try
    {
        var doc = await CustomerDetailsModel.find({CustomerUserName: uname})
        res.status(200).json({
            status: "Success",
            message: "Records Found!",
            data: doc
        })
    }catch(ex)
    {
        res.status(400).json({
            status: "Failed",
            message: ex.message
        })
    }
}

exports.checkDuplicateEmail = async (req, res)=>{
    var email = req.params.email;
    try
    {
        var doc = await CustomerDetailsModel.find({CustomerEmail: email})
        res.status(200).json({
            status: "Success",
            message: "Records Found!",
            data: doc
        })
    }catch(ex)
    {
        res.status(400).json({
            status: "Failed",
            message: ex.message
        })
    }
}

exports.getDetailsByUsername = async (req, res)=> {
    var uname = req.params.uname;
    var otp;
    try
    {
        CustomerIDModel.findOneAndUpdate({idName: "otpGen"}, {"$inc": {"seq": 1}}, {new:true}, async (err, document)=>
        {
            if(document==null)
            {
                const newval = new CustomerIDModel({idName:"otpGen", seq:1001});
                newval.save()
                otp=1001;
            }else
            {
                otp = document.seq;
            }

            var doc = await CustomerDetailsModel.find({CustomerUserName: uname})
            res.status(200).json({
                status: "Success",
                message: "User found!",
                otp: otp,
                data: doc
            })

        })           

        
    }catch(ex)
    {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}

exports.getAddress = async (req, res)=> {
    var pin = req.params.pin;
    try
    {
        var doc = await AddressModel.find({Pincode: pin})

        res.status(200).json({
            status: "Success",
            message: "Records Found!",
            data: doc
        })
    }catch(ex)
    {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}

exports.checkLoginDetails = async (req, res)=> {
    var uname = req.params.uname;
    var pass = req.params.pass;
    try
    {
        var doc = await CustomerDetailsModel.find({$and: [{CustomerUserName: uname, CustomerPass: pass}]})
        res.status(200).json({
            status: "Success",
            message: "Records Found!",
            data: doc
        })
    }catch(ex)
    {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}

exports.enrollCustomer = async (req, res)=> {
    var CustID;
    var formdata = req.body;
    // console.log(formdata)
    var flag = true;
    try
    { 
        CustomerIDModel.findOneAndUpdate({idName: "autoincr"}, {"$inc": {"seq": 1}}, {new:true}, async (err, doc)=>
            {
                if(doc==null)
                {
                    const newval = new CustomerIDModel({idName:"autoincr", seq:101});
                    newval.save()
                    CustID = 101;
                }else
                {
                    CustID = doc.seq;
                }
    
                var data = {
                    CustomerID: CustID,
                    CustomerFName: formdata.CustomerFName,
                    CustomerLName: formdata.CustomerLName,
                    CustomerGen: formdata.CustomerGen,
                    CustomerEmail: formdata.CustomerEmail,
                    CustomerPhone: formdata.CustomerPhone,
                    CustomerCountry: formdata.CustomerCountry,
                    CustomerState: formdata.CustomerState,
                    CustomerCity: formdata.CustomerCity,
                    CustomerAdd: formdata.CustomerAdd,
                    CustomerPin: formdata.CustomerPin,
                    CustomerUserName: formdata.CustomerUserName,
                    CustomerPass: formdata.CustomerPass
                }
                
                await CustomerDetailsModel.create(data, (err, document)=>{
                    if(!err)
                    {
                        res.status(200).json({
                            status: "Success",
                            message: "Data posted successfully!",
                            data: document
                            })
                    }else
                    {
                        res.status(400).json({
                            status: "Failed",
                            message: err.message,
                        })
                    }
                })
            })
    }catch(ex)
    {
        console.log(ex.message);
        res.status(400).json({
            status: "Failed",
            message: ex.message,
        })
    }
}



