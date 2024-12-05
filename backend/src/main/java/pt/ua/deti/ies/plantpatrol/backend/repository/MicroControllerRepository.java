package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;

import java.util.List;

public interface MicroControllerRepository extends MongoRepository<MicroController,String> {

    @Query("{ 'greenhouseId': { $in: ['', null] } }")
    List<MicroController> listAvailable();

    @Query("{ 'controllerId': ?0 }")
    @Update("{ $set: { greenhouseId: ?1 } }")
    void updateGreenhouseId(String id, String greenhouseId);

}
