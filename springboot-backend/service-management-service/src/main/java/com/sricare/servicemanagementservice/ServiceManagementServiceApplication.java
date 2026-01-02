package com.sricare.servicemanagementservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServiceManagementServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceManagementServiceApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Service Management Service Running";
    }
}
