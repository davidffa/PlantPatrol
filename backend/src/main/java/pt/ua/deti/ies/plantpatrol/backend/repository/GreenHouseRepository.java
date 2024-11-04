package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;

public interface GreenHouseRepository extends MongoRepository<GreenHouse,String> {
    public GreenHouse findGreenHouseByName(String name);
    @Query("{_id: ?0}")
    @Update("{'$addToSet': {'rules': ?1}}")
    public void addRule(String id, String rule);

    @Query("{'_id': ?0}")
    @Update("{'$pull': {'rules':?1}}")
    public void removeRule(String id,String rule);

    @Query(value = "{ '_id': ?0 }", fields = "{ 'rules': 1 }")
    public GreenHouse findGreenHouseRulesById(String id);
}
