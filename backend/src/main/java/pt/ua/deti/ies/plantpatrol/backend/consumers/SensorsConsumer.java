package pt.ua.deti.ies.plantpatrol.backend.consumers;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.plantpatrol.backend.dto.SensorsReadingDTO;
import pt.ua.deti.ies.plantpatrol.backend.enums.ReadingType;
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

    @KafkaListener(groupId = "backend_consumer_hourly", topics = "hourly-sensors-avg")
    public void consumeHourlyAvg(SensorsReadingDTO dto) {
        sensorsService.createAvg(dto, ReadingType.HOURLY);
    }

    @KafkaListener(groupId = "backend_consumer_daily", topics = "daily-sensors-avg")
    public void consumeDailyAvg(SensorsReadingDTO dto) {
        sensorsService.createAvg(dto, ReadingType.DAILY);
    }

    @KafkaListener(groupId = "backend_consumer_weekly", topics = "weekly-sensors-avg")
    public void consumeWeeklyAvg(SensorsReadingDTO dto) {
        sensorsService.createAvg(dto, ReadingType.WEEKLY);
    }
}
