const Database = require("./database");

class EmployeeDatabase extends Database {
  constructor(options) {
    super(options);
  }
  viewDepartments() {
    console.log("viewing department");
  }
  viewRoles() {
    console.log("viewing roles");
  }
  viewEmployees() {
    console.log("Viewing Employees");
  }
}

module.exports = EmployeeDatabase;
