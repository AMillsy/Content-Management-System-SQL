const mysql = require("mysql2");

class Database {
  constructor(options) {
    this.options = options;
    this.db = null;
  }

  connect() {
    const { host, user, password, database } = this.options;
    this.db = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });

    console.log("Database connected");
  }

  disconnect() {
    this.db.disconnect();
  }
}
