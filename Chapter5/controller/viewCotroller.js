const path = require('path');
const data = {
    employees: require(path.join(__dirname, '..', 'model', 'employees.json')),
    setEmployees :  (newData) => {
        data.employees = newData
    }
};
const fsPromise = require('fs').promises;

const getEmployees = (req,res) => {
    res.json(data.employees);
}

const addEmployee = async (req,res) => {
    const newEmployee = {
        id: data.employees?.length?data.employees[data.employees.length-1].id+1 : 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    };
    if(!req.body.firstname && !req.body.lastname) {
        res.status(400).send(`please give a valid firstname:${req.body.firstname} and lastname:${req.body.lastname}`);
    }else {
        data.setEmployees([...data.employees, newEmployee]);
        await fsPromise.writeFile(path.join(__dirname,'..','model','employees.json'), JSON.stringify(data.employees))
        res.json(data.employees);
    }
}

 //modify data
const updateEmployee = async (req,res)=> {   
    if((parseInt(req.body.id) > data.employees.length-1) || (parseInt(req.body.id) <= 0)) {
        res.end(`Your given id:${req.body.id} does not exist`);
    }else {
        const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        if(req.body.firstname) employee.firstname = req.body.firstname;
        if(req.body.lastname) employee.lastname = req.body.lastname;
        const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
        data.setEmployees([...filteredArray, employee]);
        data.employees.sort((a,b)=> parseInt(a.id)-parseInt(b.id));
        await fsPromise.writeFile(path.join(__dirname,'..','model','employees.json'), JSON.stringify(data.employees))
        res.json(data.employees);
    }
}

const deleteEmployee = async (req,res)=> {
    if(parseInt(req.body.id) > data.employees.length) {
        res.status(400).send(`id:${req.body.id} is not found`);
    } else {
        const filteredArray =  data.employees.filter(emp => emp.id !== parseInt(req.body.id));
        data.setEmployees([...filteredArray]);
        await fsPromise.writeFile(path.join(__dirname,'..','model','employees.json'), JSON.stringify(data.employees))
        res.json(data.employees);
    }
}

const getEmployeeById = (req,res)=> {
    if((parseInt(req.params.id) > data.employees.length) || (parseInt(req.body.id <= 0))) {
        res.status(400).send(`id:${req.params.id} not found`);
    } else {
        const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
        res.json(employee);
    }   
}

module.exports = {getEmployees, addEmployee, updateEmployee, deleteEmployee, getEmployeeById};

