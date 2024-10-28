package pt.ua.deti.ies.plantpatrol.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class CreateEmployeeResponseDTO {
    private String username;
    private String password;
}
