package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.CreateEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.CreateEmployeeResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.LoginEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.repository.EmployeeRepository;
import pt.ua.deti.ies.plantpatrol.backend.utils.StringUtils;

@Service
public class AuthService {
    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(EmployeeRepository employeeRepository, BCryptPasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public CreateEmployeeResponseDTO createEmployee(CreateEmployeeDTO dto) throws Exception {
        if (employeeRepository.findByUsername(dto.getUsername()).isPresent())
            throw new Exception("Username already exists!");

        String password = StringUtils.generateRandomString(16);

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

        employee = employeeRepository.save(employee);

        return CreateEmployeeResponseDTO
                .builder()
                .id(employee.getId())
                .username(dto.getUsername())
                .password(password)
                .build();
    }

    public Employee authenticate(LoginEmployeeDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername(),
                        dto.getPassword()
                )
        );
        return employeeRepository.findByUsername(dto.getUsername()).orElseThrow();
    }
}
