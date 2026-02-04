



import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Table, Card, Row, Col } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = () => {
    axios.get("http://localhost:8080/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  const fetchAttendance = () => {
    axios.get("http://localhost:8080/attendance")
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));
  };

  const addEmployee = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/employees", { name, department, salary })
      .then(() => {
        fetchEmployees();
        setName(""); setDepartment(""); setSalary("");
      })
      .catch(err => console.error(err));
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/employees/${id}`)
      .then(() => fetchEmployees())
      .catch(err => console.error(err));
  };

  const handleEdit = (emp) => {
    setEditForm(emp);
    setEditModal(true);
  };

  const updateEmployee = () => {
    axios.put(`http://localhost:8080/employees/${editForm.id}`, editForm)
      .then(() => {
        setEditModal(false);
        fetchEmployees();
      })
      .catch(err => console.error(err));
  };

  const markAttendance = async (id, status) => {
    try {
      await axios.post("http://localhost:8080/attendance/mark", {
        employeeId: id,
        date: new Date().toISOString().split("T")[0],
        status: status
      });
      fetchAttendance();
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const deptCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});
  const deptSalary = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + emp.salary;
    return acc;
  }, {});

  // ✅ Download Attendance Report
  const downloadAttendanceReport = () => {
    if (attendance.length === 0) {
      alert("No attendance records to download!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(attendance);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Attendance_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // ✅ Download Employee Report
  const downloadEmployeeReport = () => {
    if (employees.length === 0) {
      alert("No employee data to download!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Employee_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Task Management Dashboard</h2>

      {/* ====================== DASHBOARD SECTION ====================== */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3 text-center shadow-sm bg-primary text-white">
            <h5>Total Employees</h5>
            <h3>{totalEmployees}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="p-3 text-center shadow-sm bg-success text-white">
            <h5>Total Salary Expense</h5>
            <h3>₹ {totalSalary}</h3>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="p-3 mb-4 shadow-sm">
            <h5 className="text-center">Employees by Department</h5>
            <Bar
              data={{
                labels: Object.keys(deptCounts),
                datasets: [{
                  label: "Employees",
                  data: Object.values(deptCounts),
                  backgroundColor: "rgba(54,162,235,0.6)"
                }]
              }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 mb-4 shadow-sm">
            <h5 className="text-center">Salary Distribution by Department</h5>
            <Pie
              data={{
                labels: Object.keys(deptSalary),
                datasets: [{
                  data: Object.values(deptSalary),
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
                }]
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* ====================== ATTENDANCE SECTION ====================== */}
      <h4 className="mt-5">Employee Attendance</h4>
      <Table bordered className="mt-3">
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
                <Button variant="success" size="sm" className="me-2"
                  onClick={() => markAttendance(emp.id, "Present")}>
                  Present
                </Button>
                <Button variant="danger" size="sm"
                  onClick={() => markAttendance(emp.id, "Absent")}>
                  Absent
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Attendance Records + Download */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h5>Attendance Records</h5>
        <Button variant="outline-success" onClick={downloadAttendanceReport}>
          📥 Download Attendance Excel
        </Button>
      </div>

      <Table striped bordered hover>
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
      </Table>

      {/* ====================== EMPLOYEE MANAGEMENT ====================== */}
      <h4 className="mt-5 mb-3">Manage Employees</h4>
      <input
        type="text"
        placeholder="Search employee..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form className="row g-3 mb-4" onSubmit={addEmployee}>
        <div className="col-md-4">
          <input className="form-control" placeholder="Employee Name"
            value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Department"
            value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <input className="form-control" type="number" placeholder="Salary"
            value={salary} onChange={(e) => setSalary(e.target.value)} required />
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100">Add Employee</button>
        </div>
      </form>

      {/* ✅ Employee List + Download */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h5>Employee List</h5>
        <Button variant="outline-primary" onClick={downloadEmployeeReport}>
          📊 Download Employee Excel
        </Button>
      </div>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>₹{emp.salary}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(emp)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => deleteEmployee(emp.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ====================== EDIT MODAL ====================== */}
      <Modal show={editModal} onHide={() => setEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-2" placeholder="Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            <Form.Control className="mb-2" placeholder="Department"
              value={editForm.department}
              onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} />
            <Form.Control className="mb-2" type="number" placeholder="Salary"
              value={editForm.salary}
              onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={updateEmployee}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;



