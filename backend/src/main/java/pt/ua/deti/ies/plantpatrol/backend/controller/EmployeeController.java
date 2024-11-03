package pt.ua.deti.ies.plantpatrol.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.employee.ChangePasswordDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.CreateEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.employee.ModifyEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.AuthService;
import pt.ua.deti.ies.plantpatrol.backend.service.EmployeeService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    private final AuthService authService;
    private final EmployeeService employeeService;

    public EmployeeController(AuthService authService, EmployeeService employeeService) {
        this.authService = authService;
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public ResponseEntity<Object> listEmployees() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();

            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(employeeService.listAllEmployees());
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Object> employeeDetails(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();

            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        Optional<Employee> employee = employeeService.employeeDetails(id);

        if (employee.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Employee does not exist!"));
        }

        return ResponseEntity.ok(employee.get());
    }

    @GetMapping("/employees/@me")
    public ResponseEntity<Employee> employeeSelfDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        return ResponseEntity.ok(issuer);
    }

    @Operation(summary = "Creates a new employee, returning his credentials")
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

    @PatchMapping("/employees/{id}")
    public ResponseEntity<Object> modifyEmployee(@PathVariable String id, @RequestBody ModifyEmployeeDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();

            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        if (!employeeService.employeeExists(id)) {
            return ResponseEntity.notFound().build();
        }

        employeeService.updateEmployeeNotes(id, dto.getNotes());

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/employees/@me/change-password")
    public ResponseEntity<Object> changeSelfPassword(@RequestBody ChangePasswordDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        try {
            employeeService.changeEmployeePassword(issuer, dto.getOldPassword(), dto.getNewPassword());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new ErrorResponse(ex.getMessage()));
        }

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/employees/{id}/reset")
    public ResponseEntity<Object> resetCredentials(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();

            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        if (!employeeService.employeeExists(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(employeeService.resetCredentials(id));
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();

            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        if (!employeeService.employeeExists(id)) {
            return ResponseEntity.notFound().build();
        }

        employeeService.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }
}
