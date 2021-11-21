const sql = require("./db.js");

// constructor
const Student = function (student) {
  this.studentid = student.studentid;
  this.name = student.name;
  this.major = student.major;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO Students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.findById = (id, result) => {
  sql.query(`SELECT * FROM Students WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.getAll = (result) => {
  sql.query("SELECT * FROM Students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Students: ", res);
    result(null, res);
  });
};

Student.updateById = (id, Student, result) => {
  sql.query(
    "UPDATE Students SET email = ?, name = ?, active = ? WHERE id = ?",
    [Student.email, Student.name, Student.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Student: ", { id: id, ...Student });
      result(null, { id: id, ...Student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query("DELETE FROM Students WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Student with id: ", id);
    result(null, res);
  });
};

Student.removeAll = (result) => {
  sql.query("DELETE FROM Students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Students`);
    result(null, res);
  });
};

module.exports = Student;
