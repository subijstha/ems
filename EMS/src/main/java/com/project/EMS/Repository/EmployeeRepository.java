package com.project.EMS.Repository;

import com.project.EMS.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByEmailId(String emailId);

    @Query("select e from Employee e where e.firstName= :fName")
    Employee findByFirstName(String fName);
}
