package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.MessagePayload;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    @Query("{ chatRoomId:  ?0 }")
    @Update("{ $push: { messages: ?1 } }")
    void createMessage(String chatRoomId, MessagePayload messagePayload);
    @Override
    List<ChatRoom> findAll();
    Optional<ChatRoom> findChatRoomByChatRoomId(String chatRoomId);
}