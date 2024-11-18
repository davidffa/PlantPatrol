package pt.ua.deti.ies.plantpatrol.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "Add a new plant to the inventory")
    @PostMapping("/inventory")
    public ResponseEntity<Object> createPlant(@RequestBody List<CreatePlantDTO> dtos) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();

        if (issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not an employee").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }

        try {
            for (CreatePlantDTO dto : dtos) {
                inventoryService.createPlant(dto.getName(), dto.getQuantity());
            }

            return ResponseEntity.accepted().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "Delete a plant from the inventory")
    @DeleteMapping("/inventory/{id}")
    public ResponseEntity<Object> deletePlant(@PathVariable String id) {
        if (!inventoryService.plantExists(id)) {
            return ResponseEntity.notFound().build();
        }
        inventoryService.deletePlant(id);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Edit plant details")
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

        inventoryService.editPlantDetails(id, plt.getFamily(), plt.getMaxHeight(), plt.getAbout(),
                plt.getCuriosities());

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Edit plant minimum amount or plant amount")
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
            inventoryService.editAvailablePlant(id, plant.getAmount());
        }

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Search plants by name, or list all plants with pagination")
    @GetMapping("/inventory")
    public ResponseEntity<List<Plant>> searchByPlant(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        if (name == null) {
            return new ResponseEntity<>(inventoryService.getPlants(page, pageSize), HttpStatus.OK);
        }

        List<Plant> plants = inventoryService.searchByPlant(name);
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

    @Operation(summary = "Search plant by id")
    @GetMapping("/inventory/{id}")
    public ResponseEntity<Plant> getPlant(
            @PathVariable String id) {
        if (id == null) {
            return new ResponseEntity<>(new Plant(), HttpStatus.BAD_REQUEST);
        }

        Plant plant = inventoryService.getPlant(id);
        return new ResponseEntity<>(plant, HttpStatus.OK);
    }
}
