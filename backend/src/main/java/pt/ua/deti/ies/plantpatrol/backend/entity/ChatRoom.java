package pt.ua.deti.ies.plantpatrol.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.ua.deti.ies.plantpatrol.backend.utils.MessagePayload;

import java.util.ArrayList;

@Document(collection = "chatRoom")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChatRoom {
    @Id
    private String id;
    private String clientId;
    private ArrayList<MessagePayload> messagePayloads;
}
