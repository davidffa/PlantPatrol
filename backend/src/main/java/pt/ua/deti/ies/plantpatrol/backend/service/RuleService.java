package pt.ua.deti.ies.plantpatrol.backend.service;


import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.repository.GreenHouseRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.RuleRepository;

import java.util.List;

@Service
public class RuleService {

    private RuleRepository ruleRepository;
    private GreenHouseService greenHouseService;

    public Rule createRule(Rule r){
        return ruleRepository.save(r);
    }

    public List<Rule> createRules(List<Rule> rules){
        return ruleRepository.saveAll(rules);
    }
    public Rule updateRule(Rule r){
        return ruleRepository.save(r);
    }

    public Rule getRuleById(String id){
        return ruleRepository.findRuleById(id);
    }
    public void deleteRuleById(String id){
        ruleRepository.deleteById(id);
    }
    public void deleteRule(Rule rule){
        ruleRepository.delete(rule);
    }
}
