package pt.ua.deti.ies.plantpatrol.backend.entity.rules;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document
public class Section {

    @Id
    private String id;

    @NotBlank
    private String greenhouse;

    @NotBlank
    private List<Sensor> sensors;

    @DocumentReference
    private List<Rule> rules;
}
