package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;

import java.util.Optional;

public interface InventoryRepository extends MongoRepository<Plant, String> {
    Optional<Plant> findByName(String name);

    @Query("{ _id: ?0 }")
    @Update("{ $set: { minimum: ?1 } }")
    void updateMinimumById(String id, int minimum);

    @Query("{_id: ?0}")
    @Update("{ $set:  { available: ?1 }}")
    void updateAvailableById(String id, int available);

    @Query("{_id: ?0}")
    @Update("{ $set:  { family: ?1 , size:  ?2, about:  ?3, curiosities:  ?4}}")
    void updateDetailsById(String id, String family, String size, String about, String curiosities);

}
