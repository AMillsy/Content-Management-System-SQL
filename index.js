const inquirer = require("inquirer");
const EmployeeDatabase = require("./db/EmployeeDatabase");
const {
  menuQuestions,
  addDeparamentQuestions,
  addEmployeeQuestions,
  addRoleQuestions,
  addDepartmentQuestions,
} = require("./questions");

const db = new EmployeeDatabase({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

function init() {
  db.connect();
  doMenuQuestions();
}

init();

function doMenuQuestions() {
  inquirer.prompt(menuQuestions).then(function (response) {
    switch (response.options) {
      case "View All Departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        break;
      case "Add an Employee":
        break;
      case "Update an Employee":
        break;
    }
  });
}

function viewDepartments() {
  db.viewDepartments().then((response) => {
    console.table(response);
    doMenuQuestions();
  });
}

function viewRoles() {
  db.viewRoles().then((response) => {
    console.table(response);
    doMenuQuestions();
  });
}

function viewEmployees() {
  db.viewEmployees().then((response) => {
    console.table(response);
    doMenuQuestions();
  });
}

function addDepartment() {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    db.addDepartment(response.department);
    doMenuQuestions();
  });
}
