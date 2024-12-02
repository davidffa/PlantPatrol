package pt.ua.deti.ies.plantpatrol.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "reminders")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Reminder {
    @Id
    private String id;

    @Indexed(unique = true)
    private String clientId;

    private String pushToken;

    private Set<String> plants;
}
