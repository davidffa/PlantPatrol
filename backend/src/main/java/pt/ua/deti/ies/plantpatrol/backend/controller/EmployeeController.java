package pt.ua.deti.ies.plantpatrol.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pt.ua.deti.ies.plantpatrol.backend.dto.CreateEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.AuthService;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    private final AuthService authService;

    public EmployeeController(AuthService employeeService) {
        this.authService = employeeService;
    }

    @PostMapping("/employees")
    public ResponseEntity<Object> createEmployee(@RequestBody CreateEmployeeDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Employee issuer = (Employee) auth.getPrincipal();

        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();

            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        try {
            return new ResponseEntity<>(authService.createEmployee(dto), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
