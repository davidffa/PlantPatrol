package pt.ua.deti.ies.plantpatrol.backend.entity.rules;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection= "rules")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Rule {
    @Id
    private String id;

    @NotBlank
    private String name;

    //key-> sensor , value-> Array[minLimit,MaxLimit] of doubles
    private int minTemp,maxTemp;
    private int minHumidity,maxHumidity;
    private int minAIQ,maxAIQ;

    //key-> actuator , value-> Array[minLimit,MaxLimit] of doubles
    private double waterSystemFlow;
    private int ventilationRPM;
    //Air purifier on/off
    private boolean airPurifier;
}
