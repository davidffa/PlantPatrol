package pt.ua.deti.ies.plantpatrol.backend.service;


import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.repository.GreenHouseRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GreenHouseService {

    private final GreenHouseRepository greenHouseRepository;

    public GreenHouseService(GreenHouseRepository greenHouseRepository) {
        this.greenHouseRepository = greenHouseRepository;
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

    public GreenHouse updateRuleFromGreenHouse(String greenhouseId,Rule rule){
        GreenHouse gh =  greenHouseRepository.findById(greenhouseId).orElse(null);
        if (gh!=null){
            gh.getRules().stream().filter(r -> !r.getId().equals(rule.getId())).collect(Collectors.toList()).add(rule);
            greenHouseRepository.save(gh);
            return gh;
        }
        return null;
    }
    public void addRuleToGreenHouse(String greenhouseId,Rule rule){
        greenHouseRepository.addRule(greenhouseId,rule);
    }
    public void removeRuleToGreenHouse(String greenhouseId,String rule){
        greenHouseRepository.removeRule(greenhouseId,rule);
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
    public List<Rule> getRules(String ghName){
        return greenHouseRepository.findRulesInGreenHouse(ghName);
    }
}
