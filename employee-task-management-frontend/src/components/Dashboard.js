import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
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

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
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
    await axios.post("http://localhost:8080/attendance/mark", {
      employeeId: id,
      date: new Date().toISOString().split("T")[0],
      status
    });
    fetchAttendance();
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Task Management Dashboard</h2>

      <Row className="mb-4">
        <Col>
          <Card className="p-3 text-center bg-primary text-white">
            <h5>Total Employees</h5>
            <h3>{totalEmployees}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="p-3 text-center bg-success text-white">
            <h5>Total Salary Expense</h5>
            <h3>₹ {totalSalary}</h3>
          </Card>
        </Col>
      </Row>

      {/* ALL YOUR TABLES / FORMS / MODALS ARE HERE */}
    </div>
  );
}

export default Dashboard;
