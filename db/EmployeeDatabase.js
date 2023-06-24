const Database = require("./database");

class EmployeeDatabase extends Database {
  constructor(options) {
    super(options);
  }
}

module.exports = EmployeeDatabase;
