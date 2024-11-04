package pt.ua.deti.ies.plantpatrol.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.entity.Alert;
import pt.ua.deti.ies.plantpatrol.backend.service.AlertService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @PostMapping("/alert")
    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert) {
        Alert newAlert = alertService.sendAlert(alert);
        return new ResponseEntity<>(newAlert, HttpStatus.CREATED);
    }

    @GetMapping("/alert")
    public ResponseEntity<Alert> getAlert() {
        List<Alert> alerts = alertService.findAll();
        Alert lastAlert = alerts.get(alerts.size() - 1);
        return new ResponseEntity<>(lastAlert, HttpStatus.OK);
    }

}

