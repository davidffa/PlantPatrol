package pt.ua.deti.ies.plantpatrol.backend.service;


import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.repository.GreenHouseRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.MicroControllerRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.RulesRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

    public void addMicroControllerToGreenHouse(String greenhouseId, MicroController microController) {
        MicroController m = microControllerRepository.save(microController);
        greenHouseRepository.addMicroController(greenhouseId, m.getControllerId());
    }

    public void removeControllerFromGreenHouse(String greenhouseId, String microController) {
        greenHouseRepository.removeMicroController(greenhouseId, microController);
    }

    public List<MicroController> getMicroController(String greenhouseId) {
        Optional<GreenHouse> optionalGreenHouse = greenHouseRepository.findById(greenhouseId);

        if (optionalGreenHouse.isEmpty()) return null;

        GreenHouse greenhouse = optionalGreenHouse.get();

        if (greenhouse.getMicroControllersIds() != null) {
            List<String> microControllersIds = greenhouse.getMicroControllersIds();
            if (!microControllersIds.isEmpty()) {
                return microControllerRepository.findAllById(microControllersIds);
            }
        }
        return Collections.emptyList();
    }

}
