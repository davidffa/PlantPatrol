package pt.ua.deti.ies.plantpatrol.backend.controller;


import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.GreenHouseService;

import java.util.List;

@RestController
@RequestMapping("api/v1/greenhouse")
public class GreenHouseController {

    private GreenHouseService greenHouseService;



    @PostMapping
    public ResponseEntity<Object> createGreenHouse(@RequestBody GreenHouse greenHouse) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//
//        Employee issuer = (Employee) auth.getPrincipal();
//        if (!issuer.isManager()) {
//            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
//            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//        }
        greenHouseService.createGreenHouse(greenHouse);
        return new ResponseEntity<>(greenHouse, HttpStatus.CREATED);
    }
    @PostMapping
    public ResponseEntity<Object> createGreenHouse(@RequestBody List<GreenHouse> greenHouse) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//
//        Employee issuer = (Employee) auth.getPrincipal();
//        if (!issuer.isManager()) {
//            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
//            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//        }
        greenHouseService.createGreenHouses(greenHouse);
        return new ResponseEntity<>(greenHouse, HttpStatus.CREATED);
    }
    @GetMapping("/all")
    public ResponseEntity<List<GreenHouse>> getGreenHouse() {
        return new ResponseEntity<>(greenHouseService.getGreenHouses(), HttpStatus.OK);
    }
    @GetMapping("{name}")
    public ResponseEntity<GreenHouse> getGreenHouse(@PathVariable String name) {
        return new ResponseEntity<>(greenHouseService.getGreenHouseName(name), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Object> updateGreenHouse(@RequestBody GreenHouse greenHouse) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Employee issuer = (Employee) auth.getPrincipal();
        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        greenHouseService.updateGreenHouse(greenHouse);
        return new ResponseEntity<>(greenHouse, HttpStatus.CREATED);
    }
}
