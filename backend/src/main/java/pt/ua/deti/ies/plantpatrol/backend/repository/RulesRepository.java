package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;

public interface RulesRepository extends MongoRepository<Rule,String> {

}
