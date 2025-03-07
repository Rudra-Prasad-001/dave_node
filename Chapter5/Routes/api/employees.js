const express = require('express');
const path = require('path');
const router = express.Router();

const data = {};
// assigning employee(key) to data (object)

data.employees = require(path.join(__dirname, '..', '..', 'data', 'employees.json'));

router.route('/')
    .get((req,res)=> {
        res.json(data.employees);
    })
    .post((req,res)=> {   //add or create
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .put((req,res)=> {       //modify data
        res.json({
            "firstname": req.body.firstname,
            "lstname": req.body.lastname
        });
    })
    .delete((req,res)=> {
        res.json({
            "id": req.body.id
        });
    });

router.route('/:id')
    .get((req,res)=> {
        res.json({
            "id" : req.params.id
        });
    });
    
module.exports = router;