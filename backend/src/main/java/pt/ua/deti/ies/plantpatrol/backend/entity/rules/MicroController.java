package pt.ua.deti.ies.plantpatrol.backend.entity.rules;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "controllers")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MicroController {
    @Id
    private String controllerId;


    private String greenhouseId;
}
