package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.CreateEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.CreateEmployeeResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.repository.EmployeeRepository;

@Service
public class AuthService {
    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(EmployeeRepository employeeRepository, BCryptPasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public CreateEmployeeResponseDTO createEmployee(CreateEmployeeDTO dto) throws Exception {
        if (employeeRepository.findByUsername(dto.getUsername()).isPresent())
            throw new Exception("Username already exists!");

        String password = "123";

        Employee employee = Employee
                .builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(password))
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .phoneNumber(dto.getPhoneNumber())
                .address(dto.getAddress())
                .birthDate(dto.getBirthDate())
                .notes(dto.getNotes())
                .build();

        employeeRepository.save(employee);

        return CreateEmployeeResponseDTO
                .builder()
                .username(dto.getUsername())
                .password(password)
                .build();
    }

    public Employee authenticate() {
        throw new UnsupportedOperationException("NOT IMPLEMENTED YET");
    }
}
