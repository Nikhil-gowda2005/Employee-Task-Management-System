import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
} from "@mui/material";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const addEmployee = (e) => {
    e.preventDefault();
    const newEmployee = { name, department, salary };

    if (editId) {
      axios
        .put(`http://localhost:8080/employees/${editId}`, newEmployee)
        .then(() => {
          alert("✅ Employee updated successfully!");
          resetForm();
          fetchEmployees();
        })
        .catch((error) => console.error("Error updating employee:", error));
    } else {
      axios
        .post("http://localhost:8080/employees", newEmployee)
        .then(() => {
          alert("✅ Employee added successfully!");
          resetForm();
          fetchEmployees();
        })
        .catch((error) => console.error("Error adding employee:", error));
    }
  };

  const editEmployee = (emp) => {
    setEditId(emp.id);
    setName(emp.name);
    setDepartment(emp.department);
    setSalary(emp.salary);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:8080/employees/${id}`)
        .then(() => {
          alert("🗑️ Employee deleted!");
          fetchEmployees();
        })
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  const resetForm = () => {
    setName("");
    setDepartment("");
    setSalary("");
    setEditId(null);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Employee Task Management 👩‍💼
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Employee"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 3, width: "50%" }}
      />

      {/* Employee Form */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <form onSubmit={addEmployee}>
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <TextField
              label="Employee Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Department"
              variant="outlined"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <TextField
              label="Salary"
              variant="outlined"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {editId ? "Update" : "Add"} Employee
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Employee Table */}
      <Paper elevation={2}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Salary</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>₹{emp.salary}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => editEmployee(emp)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default EmployeeTable;
