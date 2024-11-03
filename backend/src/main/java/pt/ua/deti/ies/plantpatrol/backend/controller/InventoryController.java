package pt.ua.deti.ies.plantpatrol.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.inventory.CreatePlantDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.InventoryService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("/inventory")
    public ResponseEntity<Object> createPlant(@RequestBody CreatePlantDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not an employee").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        try {
            inventoryService.createPlant(dto.getName(), dto.getQuantity());
            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/inventory/{id}")
    public ResponseEntity<Object> deletePlant(@PathVariable String id) {
        if (!inventoryService.plantExists(id)) {
            return ResponseEntity.notFound().build();
        }
        inventoryService.deletePlant(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/inventory/{id}")
    public ResponseEntity<Object> editPlantDetails(@PathVariable String id, @RequestBody Plant plt) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not an employee").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        if (!inventoryService.plantExists(id)) {
            return ResponseEntity.notFound().build();
        }

        inventoryService.editPlantDetails(id, plt.getFamily(), plt.getMaxHeight(), plt.getAbout(), plt.getCuriosities());

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/inventory/{id}")
    public ResponseEntity<Object> editPlant(@PathVariable String id, @RequestBody Plant plant) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (!inventoryService.plantExists(id)) {
            return ResponseEntity.notFound().build();
        }

        if (issuer.isManager()) {
            inventoryService.editMinimumPlant(id, plant.getMinimum());
        } else {
            inventoryService.editAvailablePlant(id, plant.getQuantity());
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<Plant>> searchByPlant(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        if (name == null) {
            return new ResponseEntity<>(inventoryService.getPlants(page, pageSize), HttpStatus.OK);
        }

        List<Plant> plants = inventoryService.searchByPlant(name);
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }
}
