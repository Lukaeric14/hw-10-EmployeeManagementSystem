const inquirer = require('inquirer');
const config = require('./config/connection');
const cTable = require('console.table');
const { response } = require('express');

config.connect(err => {
    if (err) throw err;  
    else {
    console.log("works");
    questions();
}});

function questions() {
    inquirer.prompt([{
        type: 'list',
        name: 'questions',
        message: 'What do you want to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Create New Department',
            'Create New Role',
            "Create New Employee",
            "Exit"
        ]
    }]).then((response) => {
        switch (response.questions) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Create New Department':
                createDepartment();
                break;
            case 'Create New Role':
                createRole();
                break;
            case "Create New Employee":
                createEmployee();
                break;
            case "Exit":
                exit();
        }
    })
};

function viewDepartments() {
    const mysql = `SELECT department.id AS 'ID',department.department_name AS 'Department' FROM department`;
    config.query(mysql, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            questions();
        }
    })
}

function  viewRoles() {
    const mysql = `SELECT roles.id AS 'ID', 
    roles.title AS 'Title' 
    FROM roles
    JOIN department ON roles.department_id = department.id`;
    config.query(mysql, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            questions();
        }
    })
}

function viewEmployees() {
    const mysql = `SELECT employee.id AS 'ID', 
    employee.first_name AS 'First Name', 
    employee.last_name AS 'Last Name',
    roles.title AS 'Title',
    department.department_name AS 'Department',
    roles.salary AS 'Salary'
    FROM employee
    LEFT JOIN roles ON (employee.role_id = roles.id)
    LEFT JOIN department ON (department.id = roles.department_id)
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`
    config.query(mysql, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            questions();
        }
    })
}

function createDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        Message: 'Department Name:'
    }]).then(function(data) {
        const mysql = `INSERT INTO department (department_name) VALUES ('${data.departmentName}')`;
        console.log(`${data.departmentName} has been added as a new department`);
        config.query(mysql, (error,result) => {
            if (error) { console.log(error)} 
            questions();
        })
    })
}

function  createRole() {
    inquirer.prompt([{
        type: 'input',
        name: 'roleName',
        Message: 'Role Name:'
    },{
        type: 'input',
        name: 'departmentID',
        Message: 'Department Name (by ID):'
    }, {
        type: 'input',
        name: 'roleSalary',
        Message: 'Salary Amount:'
    }]).then(function(data) {
        config.query('INSERT INTO roles SET ?', {
            title: data.roleName,
            department_id: data.departmentName,
            salary: data.roleSalary,
          })
    })
}

function createEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        Message: 'First Name:'
    },{
        type: 'input',
        name: 'lastName',
        Message: 'Last Name:'
    },{
        type: 'input',
        name: 'managerID',
        Message: 'Manager Name (by ID):'
    }, {
        type: 'input',
        name: 'roleID',
        Message: 'Role Name (by ID):'
    }]).then(function(data) {
        config.query('INSERT INTO employee SET ?', {
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: data.role_id,
            manager_id: data.manager_id,
          })
})}