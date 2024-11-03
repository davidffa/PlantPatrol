package pt.ua.deti.ies.plantpatrol.backend.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "message")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Message
{
    @Id
    private String id;
    private String content;
    @NotBlank
    private String senderId;
    @NotBlank
    private String receiverId;
    private String recipientId;
}
