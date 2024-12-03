package pt.ua.deti.ies.plantpatrol.backend.dto.chat;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MessagePayload {
    private String content;
    private String senderId;
    private LocalDateTime timestamp;
}
