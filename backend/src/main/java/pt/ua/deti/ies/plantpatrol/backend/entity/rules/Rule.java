package pt.ua.deti.ies.plantpatrol.backend.entity.rules;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection= "rules")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Rule {
    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    //key-> sensor , value-> Array[minLimit,MaxLimit] of doubles
    private int minTemp,maxTemp;
    private int minHumidity,maxHumidity;
    private int minAIQ,maxAIQ;

    @NotBlank
    //key-> actuator , value-> Array[minLimit,MaxLimit] of doubles
    private double WaterSystemFlow;
    private int VentilationRPM;
    //Air purifier on/off
    private boolean AIP;
}
