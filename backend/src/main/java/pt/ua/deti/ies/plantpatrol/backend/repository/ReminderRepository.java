package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import pt.ua.deti.ies.plantpatrol.backend.entity.Reminder;

import java.util.List;
import java.util.Optional;

public interface ReminderRepository extends MongoRepository<Reminder, String> {
    Optional<Reminder> findByClientId(String clientId);

    @Query("{ plants: { $eq: ?0 } }")
    List<Reminder> findRemindersForPlantId(String plantId);
}
