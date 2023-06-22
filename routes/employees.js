let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Employees = require('../models/employees');

//Manage routes
router.get('/', (req, res, next) => {
    Employees.find((err, employeesList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(productList);
            res.render('employees/list', {title: 'Employees Info', EmployeesList: employeesList})
        }
    });
});

// to open add product page
router.get('/add', (req, res, next) => {
    res.render('employees/add', {title: 'Add Employees'})
});

// insert product data into mongoDB collection
router.post('/add', (req, res, next) => {
    let newEmployees = Employees({
        "name": req.body.pname,
        "address": req.body.paddress,
        "number": req.body.number
    });

    //insert data into the mongoDB
    Employees.create(newEmployees, (err, Employees) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/employees')
        }
    })
});


//to delete documents from the collection
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Employees.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/employees');
        }
    })
})

module.exports = router;