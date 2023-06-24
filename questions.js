const menuQuestions = [
  {
    type: "list",
    name: "options",
    message: "",
    choices: [
      "View All Deparaments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an Employee",
      "Update an Employee",
    ],
  },
];

const addDeparamentQuestions = [
  {
    type: "text",
    name: "deparament",
    message: "New Deparament name is... ",
  },
];

const addRoleQuestions = [
  {
    type: "text",
    name: "roleName",
    message: "New Role name is... ",
  },
  {
    type: "text",
    name: "roleSalary",
    message: "Salary for this role is... ",
  },
  {
    type: "list",
    name: "roleDeparament",
    message: "Deparament for the role is... ",
    //Dynamically add the choices in
    choices: [],
  },
];

const addEmployeeQuestions = [
  {
    type: "text",
    name: "employeeFirstName",
    message: "Employee's First Name is... ",
  },
  {
    type: "text",
    name: "employeeLastName",
    message: "Employee's Last Name is... ",
  },
  {
    type: "list",
    name: "employeeRole",
    message: "Employee's Role is... ",
    //Dynamically show this list
    choices: [],
  },
  {
    type: "list",
    name: "employeeManager",
    message: "Employee's Maanger is... ",
    //Dynamically add to this list
    choices: ["None"],
  },
];
