package pt.ua.deti.ies.plantpatrol.backend.consumers;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.plantpatrol.backend.dto.SensorsReadingDTO;
import pt.ua.deti.ies.plantpatrol.backend.service.SensorsService;

@Component
public class SensorsConsumer {

    private final SensorsService sensorsService;

    public SensorsConsumer(SensorsService sensorsService) {
        this.sensorsService = sensorsService;
    }

    @KafkaListener(groupId = "backend_consumer", topics = "sensors")
    public void consumeSensorData(SensorsReadingDTO dto) {
        sensorsService.createSensorsReading(dto);
    }
}
