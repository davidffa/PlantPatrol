package pt.ua.deti.ies.plantpatrol.backend.entity;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Sections")
public class Section {

    @Id
    private String id;

    @NotBlank
    private String greenhouse;

    @NotBlank
    private List<Sensor> sensors;

    @NotBlank
    private List<Rule> rules;
}
