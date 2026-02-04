package com.employee.taskmanagement.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long employeeId;

    @Column(nullable = false)
    private LocalDate date      ;

    @Column(nullable = false)
    private String status; // Present or Absent

    public Attendance() {}

    public Attendance(Long employeeId, LocalDate date, String status) {
        this.employeeId = employeeId;
        this.date = date;
        this.status = status;
    }

    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public LocalDate getDate() { return date; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setStatus(String status) { this.status = status; }
}
