package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.Rule;

import java.util.List;

public interface GreenHouseRepository extends MongoRepository<GreenHouse,String> {
    public GreenHouse findGreenHouseByName(String name);
    @Aggregation(pipeline = {"{$match:{name: ?0 }}","{$unwind:$sections}","{$projection: {rules:$rules}}"})
    public List<Rule> findRulesInGreenHouse(String name);
    @Query("{_id: ?0}")
    @Update("{$push: {rules: ?1}}")
    public void addRule(String id,Rule rule);

    @Query("{_id: ?0}")
    @Update("{$pop: {rules._id: ?1}}")
    public void removeRule(String id,String rule);

}
