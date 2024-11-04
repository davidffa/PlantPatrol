package pt.ua.deti.ies.plantpatrol.backend.service;


import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.repository.GreenHouseRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.RulesRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GreenHouseService {

    private final GreenHouseRepository greenHouseRepository;
    private final RulesRepository rulesRepository;
    private final MongoTemplate mongoTemplate;
    public GreenHouseService(GreenHouseRepository greenHouseRepository, RulesRepository rulesRepository, MongoTemplate mongoTemplate) {
        this.greenHouseRepository = greenHouseRepository;
        this.rulesRepository = rulesRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<GreenHouse> getGreenHouses() {
        return greenHouseRepository.findAll();
    }

    public GreenHouse getGreenHouseByName(String name) {
        return greenHouseRepository.findGreenHouseByName(name);
    }

    public GreenHouse getGreenHouseById(String id) {
        return greenHouseRepository.findById(id).orElse(null);
    }

    //    public Rule updateRuleFromGreenHouse(Rule rule){
//        rulesRepository.updateById(rule.getId(),rule);
//        return rule;
//    }
//
    public void addRuleToGreenHouse(String greenhouseId, Rule rule) {
        Rule r = rulesRepository.save(rule);
        greenHouseRepository.addRule(greenhouseId, r.getId());
    }

    public void removeRuleToGreenHouse(String greenhouseId, String rule) {
        greenHouseRepository.removeRule(greenhouseId, rule);
        rulesRepository.deleteById(rule);
    }

    public void createGreenHouses(List<GreenHouse> greenHouse) {
        greenHouseRepository.saveAll(greenHouse);
    }

    public void createGreenHouse(GreenHouse greenHouse) {
        greenHouseRepository.save(greenHouse);
    }

    public void deleteGreenHouse(String id) {
        greenHouseRepository.deleteById(id);
    }


    public List<Rule> getRules(String greenhouseId) {
        Optional<GreenHouse> greenhouse = greenHouseRepository.findById(greenhouseId);
        if (greenhouse.isPresent() && greenhouse.get().getRuleIds() != null) {
            List<String> ruleIds = greenhouse.get().getRuleIds();
            if (!ruleIds.isEmpty()) {
                return rulesRepository.findAllById(ruleIds);
            }
        }
        return Collections.emptyList();
    }

}
