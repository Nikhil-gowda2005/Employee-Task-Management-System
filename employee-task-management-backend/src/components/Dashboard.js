import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Employee Task Management System</h2>
      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        <table border="1" style={{ margin: "auto", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
