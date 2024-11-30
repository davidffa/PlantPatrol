package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;

import java.util.List;

public interface MicroControllerRepository extends MongoRepository<MicroController,String> {

    @Query("{ 'greenhouseId': { $regex: '', $options: 'i' } }")
    //@Query("SELECT controllerId FROM controllers WHERE controllers.greenhouseId = '' OR controllers.greenhouseId IS NULL")
    List<MicroController> listAvailable();
}
