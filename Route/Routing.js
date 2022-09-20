var CustomerSignUpController = require('../Controllers/CustomerSignUpController')
var CustomerOrdersController = require('../Controllers/CustomerOrdersController')
var CustomerEditProfileController = require('../Controllers/CustomerEditProfileController')
var express = require('express')
var path = require('path')
var cors = require('cors');

var router = express.Router()

const static_path = path.join(__dirname, "../")
router.use(express.static(static_path))
router.use(cors())

//---------------Signup Routing----------------

router.get('/', (req, res)=> {
    res.writeHead(200, {
        'Content-type': 'text/html'
    })
    res.write(__dirname+"/index.html")
    res.end()
})

router.get('/checkLoginDetails/:uname/:pass', CustomerSignUpController.checkLoginDetails)

router.post('/enrollCustomer', CustomerSignUpController.enrollCustomer)

router.get('/getAddress/:pin', CustomerSignUpController.getAddress)

router.get('/checkDuplicatePhone/:phone', CustomerSignUpController.checkDuplicatePhone)

router.get('/checkDuplicateUsername/:uname', CustomerSignUpController.checkDuplicateUsername)

router.get('/checkDuplicateEmail/:email', CustomerSignUpController.checkDuplicateEmail)

router.get('/getDetailsByUsername/:uname', CustomerSignUpController.getDetailsByUsername)

//---------------Edit Profile Routing-----------------

router.get('/fetchProfileDetails/:id', CustomerEditProfileController.fetchProfileDetails)

router.put('/editProfile/:id', CustomerEditProfileController.editProfile)

router.delete('/closeAccount/:id', CustomerEditProfileController.closeAccount)

//---------------Orders Routing-----------------

router.post('/postingOrderDetails', CustomerOrdersController.postingOrderDetails)

router.get('/currentOrders/:id', CustomerOrdersController.currentOrders)

router.get('/previousOrders/:id', CustomerOrdersController.previousOrders)

router.get('/getFoodItems/', CustomerOrdersController.getFoodItems)


router.all('*', (req, res)=> {
    // res.status(400).json({
    //     status: "Failed",
    //     message: "Invalid route",
    // })
    res.send(`
    <div style="text-align: center">
        <h2>Error 404 Page Not Found - Invalid Path</h2>
        <h3>Check your URL</h3>
    </div>
    `)
})


module.exports = router;