package com.employee.taskmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.employee.taskmanagement.repository")
@EntityScan(basePackages = "com.employee.taskmanagement.model")
public class EmployeeTaskManagementSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeTaskManagementSystemApplication.class, args);
    }
}
