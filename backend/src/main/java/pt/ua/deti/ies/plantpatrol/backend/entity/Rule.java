package pt.ua.deti.ies.plantpatrol.backend.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import pt.ua.deti.ies.plantpatrol.backend.enums.ActuatorType;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

@Document("rules")
@NoArgsConstructor
@AllArgsConstructor
public class Rule {
    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    //key-> sensor , value-> Array[minLimit,MaxLimit] of doubles
    private Map<Sensor, Array> sensors;

    @NotBlank
    //key-> actuator , value-> Array[minLimit,MaxLimit] of doubles
    private Map<Actuator,Array> actuators;
}
