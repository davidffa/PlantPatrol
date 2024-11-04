package pt.ua.deti.ies.plantpatrol.backend.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.GreenHouseService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class GreenHouseController {

    private final GreenHouseService greenHouseService;

    public GreenHouseController(GreenHouseService greenHouseService) {
        this.greenHouseService = greenHouseService;
    }


    @PostMapping("/greenhouse")
    public ResponseEntity<Object> createGreenHouse(@RequestBody GreenHouse greenHouse) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Employee issuer = (Employee) auth.getPrincipal();
        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        greenHouseService.createGreenHouse(greenHouse);
        return new ResponseEntity<>(greenHouse, HttpStatus.CREATED);
    }

    @PostMapping("/greenhouses")
    public ResponseEntity<Object> createGreenHouses(@RequestBody List<GreenHouse> greenHouse) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Employee issuer = (Employee) auth.getPrincipal();
        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        greenHouseService.createGreenHouses(greenHouse);
        return new ResponseEntity<>(greenHouse, HttpStatus.CREATED);
    }

    @GetMapping("/greenhouse")
    public ResponseEntity<?> getGreenHouse(@RequestParam(required = false) String name) {
        if (name == null) {
            return new ResponseEntity<>(greenHouseService.getGreenHouses(), HttpStatus.OK);
        }
        return new ResponseEntity<>(greenHouseService.getGreenHouseByName(name), HttpStatus.OK);
    }

    @GetMapping("/greenhouse/{id}")
    public ResponseEntity<GreenHouse> getGreenHouseById(@PathVariable String id) {
        GreenHouse gh = greenHouseService.getGreenHouseById(id);
        if (gh==null){
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(gh, HttpStatus.OK);
    }
    @DeleteMapping("/greenhouse/{id}")
    public ResponseEntity<Object> deleteGreenHouseById(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();
        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        greenHouseService.deleteGreenHouse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/rule/{id}/{id_rule}")
    public ResponseEntity<Object> deleteRuleById(@PathVariable String id,@PathVariable String id_rule) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();
        if(issuer.isAccountNonExpired()){
            greenHouseService.removeRuleToGreenHouse(id,id_rule);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    @PutMapping("/rule/{id}")
    public ResponseEntity<Object> updateRuleById(@PathVariable String id,@RequestBody Rule rule) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();
        if(issuer.isAccountNonExpired()){
            greenHouseService.updateRuleFromGreenHouse(id,rule);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/rule/{id}")
    public ResponseEntity<Object> addRule(@PathVariable String id,@RequestBody Rule rule) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee issuer = (Employee) auth.getPrincipal();
        if(issuer.isAccountNonExpired()){
            greenHouseService.addRuleToGreenHouse(id,rule);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
