const inquirer = require("inquirer");
const EmployeeDatabase = require("./db/EmployeeDatabase");
const {
  menuQuestions,
  addDeparamentQuestions,
  addEmployeeQuestions,
  addRoleQuestions,
} = require("./questions");

const db = new EmployeeDatabase({
  host: "localhost",
  user: "root",
  password: "",
  databse: "employee_db",
});

function init() {
  db.connect();
  doMenuQuestions();
}

init();

function doMenuQuestions() {
  inquirer.prompt(menuQuestions).then(function (response) {
    switch (response.options) {
      case "View All Deparaments":
        break;
      case "View all roles":
        break;

      case "View all employees":
        break;
      case "Add a department":
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
