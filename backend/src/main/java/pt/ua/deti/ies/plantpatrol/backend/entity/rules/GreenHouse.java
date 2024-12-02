package pt.ua.deti.ies.plantpatrol.backend.entity.rules;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "greenhouses")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GreenHouse {

    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String location;

    @Field("rules")
    private List<String> ruleIds = new ArrayList<>();

    @Field("microControllers")
    private List<String> microControllersIds = new ArrayList<>();
}
