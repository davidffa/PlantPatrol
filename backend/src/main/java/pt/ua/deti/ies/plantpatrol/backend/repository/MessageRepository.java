package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.plantpatrol.backend.entity.Message;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
}
