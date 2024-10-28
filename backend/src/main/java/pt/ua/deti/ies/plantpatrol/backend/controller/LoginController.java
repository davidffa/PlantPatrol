package pt.ua.deti.ies.plantpatrol.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.LoginEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.LoginResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.service.AuthService;
import pt.ua.deti.ies.plantpatrol.backend.service.JWTService;

@RestController
@RequestMapping("/api")
public class LoginController {
    private final AuthService authService;
    private final JWTService jwtService;

    public LoginController(AuthService authService, JWTService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginEmployeeDTO dto) {
        Employee e = authService.authenticate(dto);
        String jwtToken = jwtService.generateToken(e);

        LoginResponseDTO response = LoginResponseDTO.builder().jwtToken(jwtToken).build();

        return ResponseEntity.ok(response);
    }
}
