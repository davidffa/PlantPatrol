package pt.ua.deti.ies.plantpatrol.backend.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class GeminiResponseDTO {
    private String description;
    private String curiosities;
    private String family;
    private int maxHeight;
}
