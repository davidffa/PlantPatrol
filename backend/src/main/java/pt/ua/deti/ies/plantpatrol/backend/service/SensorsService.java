package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.SensorsReadingDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.SensorsReading;
import pt.ua.deti.ies.plantpatrol.backend.enums.ReadingType;
import pt.ua.deti.ies.plantpatrol.backend.repository.SensorsRepository;

import java.time.LocalDateTime;

@Service
public class SensorsService {
    private final SensorsRepository sensorsRepository;
    private final MongoTemplate mongoTemplate;

    public SensorsService(SensorsRepository sensorsRepository, MongoTemplate mongoTemplate) {
        this.sensorsRepository = sensorsRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public void createSensorsReading(SensorsReadingDTO dto) {
        SensorsReading reading = SensorsReading
                .builder()
                .controllerId(dto.getControllerId())
                .readingType(ReadingType.INSTANT)
                .temperature(dto.getTemperature())
                .humidity(dto.getHumidity())
                .aiq(dto.getAiq())
                .uv((dto.getUv()))
                .timestamp(LocalDateTime.now())
                .build();

        sensorsRepository.save(reading);
    }

    private void aggregateSensorsData() {

    }
}
