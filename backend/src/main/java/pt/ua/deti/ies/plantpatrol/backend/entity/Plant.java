package pt.ua.deti.ies.plantpatrol.backend.entity;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "plants")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Plant {

    @Id
    private String id;

    @NotBlank
    @Indexed(unique = true)
    private String name;

    @Builder.Default
    private int minimum = 0;

    @NotNull
    private int amount;

    private String family;
    private int maxHeight;
    private String about;
    private String curiosities;

    private String imageUrl;
}
