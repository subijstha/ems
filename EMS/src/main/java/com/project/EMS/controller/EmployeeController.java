package com.project.EMS.controller;


import com.project.EMS.Repository.EmployeeRepository;
import com.project.EMS.Service.EmployeeDTO;
import com.project.EMS.exception.ResourceNotFoundException;
import com.project.EMS.model.Employee;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;
    @GetMapping("/employees")
    public ResponseEntity<?>  getAllEmployees(){
        List<Employee> employees = employeeRepository.findAll();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(@RequestBody EmployeeDTO employeeDTO){

        Employee existingEmployee = employeeRepository.findByEmailId(employeeDTO.getEmailId());
        if(existingEmployee != null){
            return new ResponseEntity<>("Employee with the same email already exists ", HttpStatus.BAD_REQUEST);
        }
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        employeeRepository.save(employee);

        return new ResponseEntity<Employee>(employee, HttpStatus.CREATED);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException(("Employee not found")));

        return new ResponseEntity<Employee>(employee, HttpStatus.FOUND);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<?> updateEmployeeId(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO){
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Employee Not Found with the id"));

        modelMapper.map(employeeDTO, existingEmployee);
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return new ResponseEntity<Employee>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/employees/{name}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String  name){
        Employee employee = employeeRepository.findByFirstName(name);

        if (employee == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Employee not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        employeeRepository.delete(employee);

        Map<String, Boolean> map = new HashMap<>();
        map.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(map);
    }

//    @DeleteMapping("/employees/{id}")
//    public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
//        Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee doesnt exist with id :" + id));
//        employeeRepository.delete(employee);
//
//        Map<String, Boolean> map = new HashMap<>();
//        map.put("deleted", Boolean.TRUE);
//        return ResponseEntity.ok(map);
//    }

}
