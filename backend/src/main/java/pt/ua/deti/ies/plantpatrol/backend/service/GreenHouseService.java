package pt.ua.deti.ies.plantpatrol.backend.service;


import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.repository.GreenHouseRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.MicroControllerRepository;
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
    private final MicroControllerRepository microControllerRepository;

    public GreenHouseService(GreenHouseRepository greenHouseRepository, RulesRepository rulesRepository, MicroControllerRepository microControllerRepository) {
        this.greenHouseRepository = greenHouseRepository;
        this.rulesRepository = rulesRepository;
        this.microControllerRepository = microControllerRepository;
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

    public Rule addRuleToGreenHouse(String greenhouseId, Rule rule) {
        Rule r = rulesRepository.save(rule);
        greenHouseRepository.addRule(greenhouseId, r.getId());

        return r;
    }

    public void removeRuleToGreenHouse(String greenhouseId, String rule) {
        greenHouseRepository.removeRule(greenhouseId, rule);
        rulesRepository.deleteById(rule);
    }

    public void createGreenHouse(GreenHouse greenHouse) {
        greenHouseRepository.save(greenHouse);
    }

    public void deleteGreenHouse(String id) {
        GreenHouse gh = this.getGreenHouseById(id);
        if(gh != null) {
            //gets all the rules from the greenhouse and deletes them
            gh.getRuleIds().forEach(rulesRepository::deleteById);
            greenHouseRepository.delete(gh);
        }
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

    public MicroController addMicroControllerToGreenHouse(String greenhouseId, MicroController microController) {
        MicroController m = microControllerRepository.save(microController);
        greenHouseRepository.addMicroController(greenhouseId, m.getControllerId());
        return m;
    }

    public void removeControllerToGreenHouse(String greenhouseId, String microController) {
        greenHouseRepository.removeMicroController(greenhouseId, microController);
    }

    public List<MicroController> getMicroController(String greenhouseId) {
        Optional<GreenHouse> greenhouse = greenHouseRepository.findById(greenhouseId);
        if (greenhouse.isPresent() && greenhouse.get().getMicroControllersIds() != null) {
            List<String> microControllersIds = greenhouse.get().getMicroControllersIds();
            if (!microControllersIds.isEmpty()) {
                return microControllerRepository.findAllById(microControllersIds);
            }
        }
        return Collections.emptyList();
    }

}
