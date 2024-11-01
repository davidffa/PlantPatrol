package pt.ua.deti.ies.plantpatrol.backend.entity.rules;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.lang.reflect.Array;
import java.util.Map;

@Document
@NoArgsConstructor
@AllArgsConstructor
public class Rule {
    @Id
    private String id;

    @NotBlank
    private String name;

    @DocumentReference
    //key-> sensor , value-> Array[minLimit,MaxLimit] of doubles
    private Map<Sensor, Array> sensors;

    @DocumentReference
    //key-> actuator , value-> Array[minLimit,MaxLimit] of doubles
    private Map<Actuator,Array> actuators;
}
