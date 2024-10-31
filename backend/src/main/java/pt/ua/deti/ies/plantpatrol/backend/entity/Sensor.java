package pt.ua.deti.ies.plantpatrol.backend.entity;


import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.ua.deti.ies.plantpatrol.backend.enums.SensorType;

@Document
public class Sensor {
    @Id
    private String id;

    @NotBlank
    private SensorType type;

    @NotBlank
    private String currentValue;

    @NotBlank
    private String minValue;
     
    @NotBlank
    private String maxValue;

}
