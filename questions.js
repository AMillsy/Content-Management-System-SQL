function validateAns(input, returnAns) {
  if (input) {
    return true;
  }
  return returnAns;
}
const menuQuestions = [
  {
    type: "list",
    name: "options",
    message: "",
    choices: [
      "View All Departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an Employee",
      "Update an Employee",
    ],
  },
];

const addDepartmentQuestions = [
  {
    type: "text",
    name: "department",
    message: "New Department name is... ",
    validate: function (input) {
      return validateAns(input, "Plese Enter in a department");
    },
  },
];

const addRoleQuestions = [
  {
    type: "text",
    name: "roleName",
    message: "New Role name is... ",
    validate: function (input) {
      return validateAns(input, "Plese Enter in a Role name");
    },
  },
  {
    type: "text",
    name: "roleSalary",
    message: "Salary for this role is... ",
    validate: function (input) {
      if (!isNaN(input)) {
        return true;
      }
      return "Please Enter in a number";
    },
  },
  {
    type: "list",
    name: "roleDepartment",
    message: "Department for the role is... ",
    //Dynamically add the choices in
    choices: [],
  },
];

const addEmployeeQuestions = [
  {
    type: "text",
    name: "firstName",
    message: "Employee's First Name is... ",
    validate: function (input) {
      return validateAns(input, "Please put in a name");
    },
  },
  {
    type: "text",
    name: "lastName",
    message: "Employee's Last Name is... ",
  },
  {
    type: "list",
    name: "role",
    message: "Employee's Role is... ",
    //Dynamically show this list
    choices: [],
  },
  {
    type: "list",
    name: "manager",
    message: "Employee's Maanger is... ",
    //Dynamically add to this list
    choices: ["None"],
  },
];

const updateEmployeeQuestions = [
  {
    type: "list",
    name: "employee",
    message: "Which Employee are you updating?",
    //Dynamic list with all the employees
    choices: [],
  },
  {
    type: "list",
    name: "role",
    message: "Role the Employee is changing to is... ",
    choices: [],
  },
];
module.exports = {
  menuQuestions,
  addDepartmentQuestions,
  addEmployeeQuestions,
  addRoleQuestions,
};
