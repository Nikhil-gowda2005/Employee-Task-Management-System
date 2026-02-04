package com.employee.taskmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employee.taskmanagement.model.Attendance;

@Repository
public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {
}
