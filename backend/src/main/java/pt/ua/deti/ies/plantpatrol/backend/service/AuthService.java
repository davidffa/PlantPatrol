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

    private String generateUsername(String firstName, String lastName) {
        if (employeeRepository.findByUsername(firstName).isEmpty()) {
            return firstName;
        }

        if (employeeRepository.findByUsername(firstName + lastName).isEmpty()) {
            return firstName + lastName;
        }

        for (int i = 0; i < 1000; ++i) {
            if (employeeRepository.findByUsername(firstName + lastName + i).isEmpty())
                return firstName + lastName + i;
        }

        return null;
    }

    public CreateEmployeeResponseDTO createEmployee(CreateEmployeeDTO dto) throws Exception {
        String username = generateUsername(dto.getFirstName(), dto.getLastName());
        String password = StringUtils.generateRandomString(16);

        if (username == null)
            throw new Exception("Could not generate an username");

        Employee employee = Employee
                .builder()
                .username(username)
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
                .username(username)
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
