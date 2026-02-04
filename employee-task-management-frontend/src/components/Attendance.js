import React, { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadEmployees();
    loadAttendance();
  }, []);

  const loadEmployees = async () => {
    const res = await axios.get("http://localhost:8080/employees");
    setEmployees(res.data);
  };

  const loadAttendance = async () => {
    const res = await axios.get("http://localhost:8080/attendance");
    setAttendance(res.data);
  };

  const markAttendance = async (id, status) => {
    await axios.post("http://localhost:8080/attendance", {
      employeeId: id,
      date: new Date().toISOString().split("T")[0],
      status: status
    });

    loadAttendance();
  };

  return (
    <div className="container mt-4">
      <h2>Employee Attendance</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Employee</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>
                <button className="btn btn-success btn-sm me-2"
                  onClick={() => markAttendance(emp.id, "Present")}>
                  Present
                </button>
                <button className="btn btn-danger btn-sm"
                  onClick={() => markAttendance(emp.id, "Absent")}>
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Attendance Records</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((att, idx) => (
            <tr key={idx}>
              <td>{att.employeeId}</td>
              <td>{att.date}</td>
              <td>{att.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
