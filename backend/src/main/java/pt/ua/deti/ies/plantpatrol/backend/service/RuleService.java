package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;
import pt.ua.deti.ies.plantpatrol.backend.repository.RulesRepository;

import java.util.List;

@Service
public class RuleService {

    private final RulesRepository rulesRepository;

    public RuleService(RulesRepository rulesRepository) {
        this.rulesRepository = rulesRepository;
    }

    public void updateRule(Rule rule){
        rulesRepository.save(rule);
    }
    public List<Rule> getRules(){
        return rulesRepository.findAll();
    }

    public Rule getRuleById(String id){
        try{
            return rulesRepository.findById(id).orElse(null);
        }
        catch (Exception e){
            return null;
        }
    }

}
