package pt.ua.deti.ies.plantpatrol.backend.controller;


import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.GreenHouseService;
import pt.ua.deti.ies.plantpatrol.backend.service.MicroControllerService;
import pt.ua.deti.ies.plantpatrol.backend.service.RuleService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class GreenHouseController {

    private final GreenHouseService greenHouseService;
    private final RuleService ruleService;
    private final MicroControllerService microControllerService;

    public GreenHouseController(GreenHouseService greenHouseService, RuleService ruleService, MicroControllerService microControllerService) {
        this.greenHouseService = greenHouseService;
        this.ruleService = ruleService;
        this.microControllerService= microControllerService;
    }

    @Operation(summary = "Creates a new greenHouse, returning his credentials")
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

    @Operation(summary = "Reads a greenhouse by the name, name is parameter passed on the url.")
    @GetMapping("/greenhouse")
    public ResponseEntity<?> getGreenHouse(@RequestParam(required = false) String name) {
        if (name == null) {
            return new ResponseEntity<>(greenHouseService.getGreenHouses(), HttpStatus.OK);
        }
        return new ResponseEntity<>(greenHouseService.getGreenHouseByName(name), HttpStatus.OK);
    }

    @Operation(summary = "Reads a greenhouse by id, and returns the greenhouse")
    @GetMapping("/greenhouse/{id}")
    public ResponseEntity<GreenHouse> getGreenHouseById(@PathVariable String id) {
        GreenHouse gh = greenHouseService.getGreenHouseById(id);
        if (gh == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(gh, HttpStatus.OK);
    }

    @Operation(summary = "Deletes the greenhouse by the id, and the rules associated with it")
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

//**********************
//        RULES
//**********************

    @Operation(summary = "Creates a new rule and adds it to a specified greenhouse.")
    @PostMapping("/rules/{id}")
    public ResponseEntity<Object> addRule(@PathVariable String id, @RequestBody Rule rule) {
        Rule createdRule = greenHouseService.addRuleToGreenHouse(id, rule);
        return new ResponseEntity<>(createdRule, HttpStatus.CREATED);
    }

    @Operation(summary = "Updates a rule")
    @PutMapping("/rules")
    public ResponseEntity<?> updateRule(@RequestBody Rule rule) {
        ruleService.updateRule(rule);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Reads all the rules from a greenhouse.")
    @GetMapping("/greenhouse/{id}/rules")
    public ResponseEntity<?> getRule(@PathVariable String id) {
        List<Rule> rules = greenHouseService.getRules(id);
        if (rules == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(rules, HttpStatus.OK);
    }
    @Operation(summary = "Reads a rule from a specific id.")
    @GetMapping("/rule/{id}")
    public ResponseEntity<?> getRuleById(@PathVariable String id) {
        Rule rule = ruleService.getRuleById(id);
        if (rule == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(rule, HttpStatus.OK);
    }

    @Operation(summary = "Reads all the rules from all the greenhouses.")
    @GetMapping("/rules")
    public ResponseEntity<?> getRules() {
        List<Rule> rules = ruleService.getRules();
        return new ResponseEntity<>(rules, HttpStatus.OK);
    }


    @Operation(summary = "Deletes a specific rule from a specific greenhouse.")
    @DeleteMapping("/rules/{id}/{ruleId}")
    public ResponseEntity<Object> deleteRuleById(@PathVariable String id, @PathVariable String ruleId) {
        greenHouseService.removeRuleToGreenHouse(id, ruleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


//**********************
//        SENSORS
//**********************

    @Operation(summary = "Associate a micro-controller to a greenhouse")
    @PatchMapping("/controller/{id}")
    public ResponseEntity<Object> addMicroController(@PathVariable String id, @RequestBody MicroController microController) {
        MicroController createdMicroController = greenHouseService.addMicroControllerToGreenHouse(id, microController);
        return new ResponseEntity<>(createdMicroController, HttpStatus.CREATED);
    }

    @Operation(summary = "Remove the association of a micro-controller to a greenhouse")
    @PatchMapping("/controller/{id}/{controllerId}")
    public ResponseEntity<Object> removeMicroControllerById(@PathVariable String id, @PathVariable String controllerId) {
        greenHouseService.removeControllerToGreenHouse(id, controllerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "List all the micro-controllers associated to a specific greenhouse")
    @GetMapping("/greenhouse/{id}/controllers")
    public ResponseEntity<?> getMicroController(@PathVariable String id) {
        List<MicroController> microController = greenHouseService.getMicroController(id);
        if (microController == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(microController, HttpStatus.OK);
    }

    @Operation(summary = "List all the available micro-controllers")
    @GetMapping("/controller")
    public ResponseEntity<?> getMicroControllersAvailable() {
        List<MicroController> microControllers = microControllerService.getAvailables();
        return new ResponseEntity<>(microControllers, HttpStatus.OK);
    }


}
