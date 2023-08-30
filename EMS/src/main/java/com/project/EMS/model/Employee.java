package com.project.EMS.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Entity
@Table(name  = "employees")
@Data
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name ="first_name")
    private String firstName;
    @Column(name = "lastName")
    private String lastName;

    @Column(name ="email_ID")
    private String emailId;


}
