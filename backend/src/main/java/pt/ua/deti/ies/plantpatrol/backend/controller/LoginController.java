package pt.ua.deti.ies.plantpatrol.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.LoginEmployeeDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.LoginResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.service.AuthService;
import pt.ua.deti.ies.plantpatrol.backend.service.JWTService;

@RestController
@RequestMapping("/api/v1")
public class LoginController {
    private final AuthService authService;
    private final JWTService jwtService;

    public LoginController(AuthService authService, JWTService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @Operation(summary = "Authenticate with username/password")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginEmployeeDTO dto, HttpServletResponse response) {
        Employee e = authService.authenticate(dto);
        String jwtToken = jwtService.generateToken(e);

        LoginResponseDTO responseBody = LoginResponseDTO.builder().passwordChanged(e.isPasswordChanged()).build();

        ResponseCookie cookie = ResponseCookie.from("accessToken", jwtToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(jwtService.getExpirationTime())
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(responseBody);
    }
}
