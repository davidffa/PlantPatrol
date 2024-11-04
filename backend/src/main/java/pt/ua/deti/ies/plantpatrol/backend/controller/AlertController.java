package pt.ua.deti.ies.plantpatrol.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.alert.CreateAlertDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Alert;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.service.AlertService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @Operation(summary = "Add a new alert")
    @PostMapping("/alert")
    public ResponseEntity<Alert> createAlert(@RequestBody CreateAlertDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();
        Alert newAlert = alertService.sendAlert(dto);
        return new ResponseEntity<>(newAlert, HttpStatus.CREATED);
    }

    @Operation(summary = "See all the alerts")
    @GetMapping("/alert")
    public ResponseEntity<List<Alert>> getAlerts() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();
        List<Alert> alerts = new ArrayList<>();
        if (issuer.isManager()){
            alerts = alertService.findAll();
        }
        else {
            for (Alert alert : alertService.findAll()) {
                if (alert.getSendto().equals("everyone") || alert.getSendto().equals(issuer.getId())) {
                    alerts.add(alert);
                }
            }
        }
        return new ResponseEntity<>(alerts, HttpStatus.OK);
    }

}

