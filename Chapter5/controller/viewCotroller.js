const { nextDay } = require('date-fns/nextDay');
const {Employee} = require('../model/Employee');
const addEmployee = async (req,res) => {
    if(!req.body.firstname && !req.body.lastname) {
        res.status(400).send(`please give a valid firstname:${req.body.firstname} and lastname:${req.body.lastname}`);
    }else {
        const result = await Employee.create({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    }
}

 //modify data
const updateEmployee = async (req,res)=> {   

    const employee = await Employee.findById(req.body.id);
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;

}

const deleteEmployee = async (req,res,next)=> {
    try{
        const deletedEmployee = await Employee.findByIdAndDelete(req.body.id);
        if(!deletedEmployee) res.status(404).json({msg:`Emplyoyee id:${req.body.id} not found`});
        res.status(200).json({msg:`Emplyoyee id:${req.body.id} deleted successfully`})
    } catch(err) {
        next(err);
    }
   
}

const getEmployeeById = async (req,res)=> {

    try {
        const employee = await Employee.findById(req.params.id);
        if(employee) res.status(200).json(employee);
    } catch(err) {
        next(err)
    }

}

module.exports = {getEmployees, addEmployee, updateEmployee, deleteEmployee, getEmployeeById};

