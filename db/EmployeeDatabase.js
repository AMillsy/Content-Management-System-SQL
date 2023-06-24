const Database = require("./database");

class EmployeeDatabase extends Database {
  constructor(options) {
    super(options);
  }
  viewDepartments() {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT * FROM department`, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  }

  viewRoles() {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT role.id,role.title, department.name as role_department, role.salary FROM role
        INNER JOIN department ON role.department_id = department.id;`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  viewEmployees() {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT employee.id,employee.first_name,COALESCE(employee.last_name,"") as last_name,role.title as job_title,role.salary as salary, CONCAT(COALESCE(managers.first_name,"")," ",COALESCE(managers.last_name,"")) as manager FROM employee
        INNER JOIN role ON employee.role_id = role.id
        LEFT JOIN employee AS managers ON employee.manager_id = managers.id
        ORDER BY employee.id;`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  addDepartment(name) {
    this.db.query(
      `INSERT INTO department(name)
        VALUE("${name}");`,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(`Add department ${name}`);
      }
    );
  }

  addRole(roleOptions) {
    const { role, salary, department } = roleOptions;
    this.db.query(
      `INSERT INTO role(title,salary,department_id)
    VALUE("${role}",${salary},${department})`,
      (err, results) => {
        if (err) {
          console.error(err);
        } else console.log("Added role to database");
      }
    );
  }

  getDepartmentID(departmentName) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
        SELECT * FROM department
        WHERE department.name = "${departmentName}";`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }
}

module.exports = EmployeeDatabase;
