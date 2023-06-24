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

  addEmployee(employeeOptions) {
    const { firstName, lastName, managerId, roleId } = employeeOptions;

    this.db.query(
      `INSERT INTO employee(first_name,last_name,role_id,manager_id)
    VALUE("${firstName}","${lastName}",${roleId},${managerId})`,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
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

  getManagerID(managerName) {
    return new Promise((resolve, reject) => {
      const splitName = managerName.split(" ");
      let query = "";
      if (!splitName[1]) {
        query = "last_name is NULL";
      } else {
        query = `last_name = "${splitName[1]}"`;
      }

      this.db.query(
        `SELECT id FROM employee
        WHERE first_name = "${splitName[0]}" and ${query};`,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  getRoleID(roleName) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT id from role
        WHERE title = "${roleName}";`,
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
