package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.employee.ListEmployeesDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.employee.ResetCredentialsResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.repository.EmployeeRepository;
import pt.ua.deti.ies.plantpatrol.backend.utils.StringUtils;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public EmployeeService(EmployeeRepository employeeRepository, BCryptPasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<ListEmployeesDTO> listAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map(employee ->
                ListEmployeesDTO
                        .builder()
                        .id(employee.getId())
                        .name(employee.getFirstName() + " " + employee.getLastName())
                        .age((int) ChronoUnit.YEARS.between(employee.getBirthDate(), LocalDate.now()))
                        .build()

        ).toList();
    }

    public Optional<Employee> employeeDetails(String id) {
        return employeeRepository.findById(id);
    }

    public boolean employeeExists(String id) {
        return employeeRepository.existsById(id);
    }

    public void updateEmployeeNotes(String id, String notes) {
        employeeRepository.updateNotesById(id, notes);
    }

    public void changeEmployeePassword(Employee emp, String oldPassword, String password) {
        if (!passwordEncoder.matches(oldPassword, emp.getPassword())) {
            throw new IllegalArgumentException("Wrong old password");
        }

        String hashedPassword = passwordEncoder.encode(password);

        employeeRepository.updatePasswordById(emp.getId(), hashedPassword);
    }

    public ResetCredentialsResponseDTO resetCredentials(String id) {
        String newPassword = StringUtils.generateRandomString(16);
        String hashedPassword = passwordEncoder.encode(newPassword);

        employeeRepository.updatePasswordById(id, hashedPassword);

        return ResetCredentialsResponseDTO.builder().password(newPassword).build();
    }

    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }
}
