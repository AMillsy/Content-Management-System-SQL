const inquirer = require("inquirer");
const EmployeeDatabase = require("./db/EmployeeDatabase");
const {
  menuQuestions,
  addEmployeeQuestions,
  addRoleQuestions,
  addDepartmentQuestions,
  updateEmployeeQuestions,
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
        updateEmployee();
        break;
    }
  });
}
//Views all the departments in the database
function viewDepartments() {
  db.viewDepartments().then((response) => {
    console.table(response);
    doMenuQuestions();
  });
}
//Views all the roles in the database
function viewRoles() {
  db.viewRoles().then((response) => {
    console.table(response);
    doMenuQuestions();
  });
}
//Views all the employees in the database
function viewEmployees() {
  db.viewEmployees().then((response) => {
    console.table(response);
    doMenuQuestions();
  });
}

//Adds a new department
function addDepartment() {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    db.addDepartment(response.department).then((response) => {
      console.log(response);
      doMenuQuestions();
    });
  });
}
//Add a new role to the list of roles
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
        }).then((response) => {
          console.log(response);
          doMenuQuestions();
        });
      });
    });
  });
}

//Updates the employees roles
function updateEmployee() {
  const updateEmployeeQ = updateEmployeeQuestions;
  getAllEmployees().then((response) => {
    updateEmployeeQuestions[0].choices.push(...response);
    getAllRoles().then((response) => {
      updateEmployeeQ[1].choices.push(...response);

      inquirer.prompt(updateEmployeeQ).then((response) => {
        //Its called get mana
        const { role, employee } = response;
        db.getEmployeeID(employee).then((response) => {
          const { id: employeeID } = response[0];

          db.getRoleID(role).then((response) => {
            const { id: roleID } = response[0];

            db.updateEmployee(roleID, employeeID).then((response) => {
              console.log(response);
              doMenuQuestions();
            });
          });
        });
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
    getAllEmployees().then((response) => {
      employeeQuestions[3].choices.push(...response);
      addEmployeeToDB(employeeQuestions);
    });
  });
}

function addEmployeeToDB(employeeQuestions) {
  inquirer.prompt(employeeQuestions).then((response) => {
    const { firstName, lastName, role, manager } = response;
    //Gets managerID
    db.getEmployeeID(manager).then((response) => {
      const { id: managerId } = response[0];
      //Gets the roleID
      db.getRoleID(role).then((roleResponse) => {
        const { id: roleId } = roleResponse[0];
        //Adds the Employee to the database
        db.addEmployee({
          firstName: firstName,
          lastName: lastName,
          managerId: managerId,
          roleId: roleId,
        }).then((response) => {
          console.log(response);
          doMenuQuestions();
        });
      });
    });
  });
}

//Gets all the roles and formats them into a Array to use for the list
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

//Gets all the Employees and formations into an array to use for the list
function getAllEmployees() {
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
