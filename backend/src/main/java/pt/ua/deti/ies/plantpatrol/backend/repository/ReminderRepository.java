package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.plantpatrol.backend.entity.Reminder;

import java.util.Optional;

public interface ReminderRepository extends MongoRepository<Reminder, String> {
    Optional<Reminder> findByClientId(String clientId);
}
