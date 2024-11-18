package pt.ua.deti.ies.plantpatrol.backend.dto.chat;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MessagePayload {
    private String content;
    private String senderId;
    private Date timestamp;
}
