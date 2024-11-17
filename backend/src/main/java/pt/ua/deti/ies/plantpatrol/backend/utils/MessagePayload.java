package pt.ua.deti.ies.plantpatrol.backend.utils;

import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class MessagePayload
{
    private String content;
    private String originId;
    private String destinationId;
    private Timestamp timestamp;

}
