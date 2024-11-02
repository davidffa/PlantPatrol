package pt.ua.deti.ies.plantpatrol.backend.controller;


import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.response.ErrorResponse;
import pt.ua.deti.ies.plantpatrol.backend.service.RuleService;

import java.util.List;

@Document("Rules")
public class RuleController{

    private final RuleService ruleService;

    public RuleController(RuleService ruleService) {
        this.ruleService = ruleService;
    }

    @PostMapping("/rule")
    public ResponseEntity<Object> createRule(@RequestBody Rule rule) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//
//        Employee issuer = (Employee) auth.getPrincipal();
//        if (!issuer.isManager()) {
//            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
//            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//        }
        ruleService.createRule(rule);
        return new ResponseEntity<>(rule, HttpStatus.CREATED);
    }
    @PostMapping("/rules")
    public ResponseEntity<Object> createRules(@RequestBody List<Rule> rules) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//
//        Employee issuer = (Employee) auth.getPrincipal();
//        if (!issuer.isManager()) {
//            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
//            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
//        }
        ruleService.createRules(rules);
        return new ResponseEntity<>(rules, HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<Object> updateRule(@RequestBody Rule greenHouse) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Employee issuer = (Employee) auth.getPrincipal();
        if (!issuer.isManager()) {
            ErrorResponse response = ErrorResponse.builder().message("You're not a manager").build();
            return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
        }
        ruleService.updateRule(greenHouse);
        return new ResponseEntity<>(greenHouse, HttpStatus.CREATED);
    }


}
