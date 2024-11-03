package pt.ua.deti.ies.plantpatrol.backend.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePlantDTO {
    private String name;
    private int quantity;
}
