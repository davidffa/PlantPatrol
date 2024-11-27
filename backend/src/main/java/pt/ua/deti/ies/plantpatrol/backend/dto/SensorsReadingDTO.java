package pt.ua.deti.ies.plantpatrol.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SensorsReadingDTO {
    private String controllerId;

    private double temperature;
    private double humidity;
    private double aiq;
    private double uv;
}
