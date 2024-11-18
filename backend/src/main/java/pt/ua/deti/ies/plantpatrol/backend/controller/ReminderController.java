package pt.ua.deti.ies.plantpatrol.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.CreateReminderDTO;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.ReminderService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class ReminderController {
    private final ReminderService reminderService;

    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }

    @Operation(summary = "List the reminders of a given client")
    @GetMapping("/reminders/{clientId}")
    public ResponseEntity<?> getReminders(@PathVariable String clientId) {
        try {
            return new ResponseEntity<>(reminderService.getReminders(UUID.fromString(clientId)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @Operation(summary = "Add a reminder of a plant to a client")
    @PostMapping("/reminders")
    public ResponseEntity<?> addReminder(@RequestBody CreateReminderDTO dto) {
        try {
            reminderService.addPlant(dto.getClientId(), dto.getPlantId());
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "Delete a reminder of a plant")
    @DeleteMapping("/reminders/{plantId}")
    public ResponseEntity<?> removeReminder(HttpServletRequest request, @PathVariable String plantId) {
        String clientId = request.getHeader("clientId");

        if (clientId == null) {
            return new ResponseEntity<>(new ErrorResponse("Missing client id"), HttpStatus.BAD_REQUEST);
        }

        try {
            reminderService.removePlant(UUID.fromString(clientId), plantId);

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
