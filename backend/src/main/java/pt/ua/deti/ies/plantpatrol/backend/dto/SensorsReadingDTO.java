package pt.ua.deti.ies.plantpatrol.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SensorsReadingDTO {
    private String controllerId;

    private double temperature;
    private double humidity;
    private double aiq;
    private double uv;
}
