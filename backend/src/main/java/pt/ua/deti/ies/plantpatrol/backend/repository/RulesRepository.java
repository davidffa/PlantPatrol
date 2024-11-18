package pt.ua.deti.ies.plantpatrol.backend.repository;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;

import java.util.Optional;

public interface RulesRepository extends MongoRepository<Rule,String> {

    Optional<Rule> findById(String id);
}
