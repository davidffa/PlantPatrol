package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends MongoRepository<Plant, String> {
    Optional<Plant> findByName(String name);

    @Query("{ name: { $regex: ?0, $options: 'i' } }")
    List<Plant> searchPlantsByName(String name);

    @Query("{ _id: ?0 }")
    @Update("{ $set: { minimum: ?1 } }")
    void updateMinimumById(String id, int minimum);

    @Query("{_id: ?0}")
    @Update("{ $set:  { amount: ?1 }}")
    void updateAvailableById(String id, int amout);

    @Query("{_id: ?0}")
    @Update("{ $set:  { imageUrl: ?1, family: ?2 , maxHeight:  ?3, about:  ?4, curiosities:  ?5}}")
    void updateDetailsById(String id, String imageUrl, String family, int maxHeight, String about, String curiosities);

}
