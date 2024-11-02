package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;

public interface RuleRepository extends MongoRepository<Rule, String> {
    Rule findRuleById(String id);
}
