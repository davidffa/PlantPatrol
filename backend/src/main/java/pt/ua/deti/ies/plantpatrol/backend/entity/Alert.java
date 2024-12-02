package pt.ua.deti.ies.plantpatrol.backend.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Date;

@Document(collection = "alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alert {
    @Id
    private String id;
    @NotBlank
    private String title;
    @NotBlank
    private String message;

    private String sendto;

    @NotNull
    @Builder.Default
    private boolean fromSystem = false;

    @NotNull
    @Builder.Default
    private Date timestamp = Date.from(Instant.now());

}
