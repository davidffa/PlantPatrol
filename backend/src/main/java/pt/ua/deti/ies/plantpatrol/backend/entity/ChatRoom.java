package pt.ua.deti.ies.plantpatrol.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.MessagePayload;

import java.util.List;

@Document(collection = "chatRoom")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChatRoom {
    @Id
    private String id;
    private String chatRoomId;
    private List<MessagePayload> messages;
}
