package pt.ua.deti.ies.plantpatrol.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.ua.deti.ies.plantpatrol.backend.enums.ReadingType;

import java.time.LocalDateTime;

@Document(collection = "sensors")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SensorsReading {
    @Id
    @JsonIgnore
    private String id;

    @Indexed
    private String controllerId;

    @Indexed
    private ReadingType readingType;

    private double temperature;
    private double humidity;
    private double aiq;
    private double uv;

    @Indexed
    private LocalDateTime timestamp;
}
