const Student = require("../models/student.model.js");

// Create and Save a new const
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const student = new Student({
    studentid: req.body.studentid,
    name: req.body.name,
    major: req.body.major,
  });

  // Save Customer in the database
  Student.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student.",
      });
    else res.send(data);
  });
};

// Retrieve all Student from the database.
exports.findAll = (req, res) => {
  Student.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    else res.send(data);
  });
};

// Find a single Student with a StudentId
exports.findOne = (req, res) => {
  Student.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Student identified by the StudentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Student.updateById(
    req.params.studentId,
    new Student(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.studentId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.studentId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Student with the specified StudentId in the request
exports.delete = (req, res) => {
  Student.remove(req.params.studentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.studentId,
        });
      }
    } else res.send({ message: `Student was deleted successfully!` });
  });
};

// Delete all Student from the database.
exports.deleteAll = (req, res) => {
  Student.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Student.",
      });
    else res.send({ message: `All Student were deleted successfully!` });
  });
};
