package pt.ua.deti.ies.plantpatrol.backend.entity;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.ua.deti.ies.plantpatrol.backend.enums.ActuatorType;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Actuator {

    @Id
    private String id ;

    @NotBlank
    private ActuatorType type;

    @NotBlank
    private double minValue;

    @NotBlank
    private double maxValue;
}
