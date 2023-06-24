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
        addRole();
        break;
      case "Add an Employee":
        addEmployee();
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

function addRole() {
  db.viewDepartments().then((response) => {
    const roleQuestions = addRoleQuestions;

    response.forEach(function ({ name }) {
      roleQuestions[2].choices.push(name);
    });

    inquirer.prompt(roleQuestions).then((response) => {
      const { roleName, roleSalary, roleDepartment } = response;

      db.getDepartmentID(roleDepartment).then((response) => {
        db.addRole({
          role: roleName,
          salary: roleSalary,
          department: response[0].id,
        });

        doMenuQuestions();
      });
    });
  });
}

function addEmployee() {
  const employeeQuestions = addEmployeeQuestions;

  //Gets all the roles from the db and puts them into inquirers questions
  getAllRoles().then((response) => {
    employeeQuestions[2].choices.push(...response);

    //Does the same but with the employees
    getAllManagers().then((response) => {
      employeeQuestions[3].choices.push(...response);

      inquirer.prompt(employeeQuestions).then((response) => {
        const { firstName, lastName, role, manager } = response;
      });
    });
  });
}

function getAllRoles() {
  return new Promise((resolve, reject) => {
    db.viewRoles().then((response) => {
      const roles = [];
      response.forEach(({ title }) => {
        roles.push(title);
      });
      resolve(roles);
    });
  });
}

function getAllManagers() {
  return new Promise((resolve, reject) => {
    db.viewEmployees().then((response) => {
      const managers = [];

      response.forEach(({ first_name, last_name }) => {
        const fullName = `${first_name} ${last_name}`;
        managers.push(fullName);
      });

      resolve(managers);
    });
  });
}
