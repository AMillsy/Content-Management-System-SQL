const inquirer = require("inquirer");
const EmployeeDatabase = require("./db/EmployeeDatabase");

const db = new EmployeeDatabase({
  host: "localhost",
  user: "root",
  password: "",
  databse: "employee_db",
});
