package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;

import java.util.List;

public interface MicroControllerRepository extends MongoRepository<MicroController,String> {
    List<MicroController> listAvailable();
}
