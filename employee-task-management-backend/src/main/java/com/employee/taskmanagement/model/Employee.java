package com.employee.taskmanagement.model;

import jakarta.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String department;
    private Double salary;
    private String email;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {        // 🔥 FIX
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {  // 🔥 FIX
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Double getSalary() {      // 🔥 FIX
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
