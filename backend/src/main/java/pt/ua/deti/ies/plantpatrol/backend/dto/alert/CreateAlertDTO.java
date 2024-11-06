package pt.ua.deti.ies.plantpatrol.backend.dto.alert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateAlertDTO {
    private String title;
    private String message;
    private String sendto;
}
