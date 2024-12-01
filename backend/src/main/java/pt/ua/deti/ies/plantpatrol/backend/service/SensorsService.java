package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.SensorsReadingDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.SensorsReading;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;
import pt.ua.deti.ies.plantpatrol.backend.enums.ReadingType;
import pt.ua.deti.ies.plantpatrol.backend.repository.MicroControllerRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.SensorsRepository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class SensorsService {
    private final SensorsRepository sensorsRepository;
    private final MicroControllerRepository microControllerRepository;

    public SensorsService(SensorsRepository sensorsRepository, MicroControllerRepository microControllerRepository) {
        this.sensorsRepository = sensorsRepository;
        this.microControllerRepository = microControllerRepository;
    }

    public void createSensorsReading(SensorsReadingDTO dto) {
        Optional<SensorsReading> optionalReading = sensorsRepository
                .findSensorsReadingByControllerIdAndReadingType(dto.getControllerId(), ReadingType.INSTANT);

        SensorsReading reading;

        if (microControllerRepository.findById(dto.getControllerId()).isEmpty()) {
            microControllerRepository.save(
                    MicroController
                            .builder()
                            .controllerId(dto.getControllerId())
                            .build()
            );
        }

        if (optionalReading.isEmpty()) {
             reading = SensorsReading
                .builder()
                .controllerId(dto.getControllerId())
                .readingType(ReadingType.INSTANT)
                .temperature(dto.getTemperature())
                .humidity(dto.getHumidity())
                .aiq(dto.getAiq())
                .uv(dto.getUv())
                .timestamp(LocalDateTime.now())
                .build();
        } else {
            reading = optionalReading.get();

            reading.setTemperature(dto.getTemperature());
            reading.setHumidity(dto.getHumidity());
            reading.setAiq(dto.getAiq());
            reading.setUv(dto.getUv());
            reading.setTimestamp(LocalDateTime.now());
        }

        sensorsRepository.save(reading);
    }

    public void createAvg(SensorsReadingDTO dto, ReadingType type) {
        LocalDateTime timestamp =
                dto.getTimestampMs() != 0
                ? Instant.ofEpochMilli(dto.getTimestampMs()).atZone(ZoneId.systemDefault()).toLocalDateTime()
                : LocalDateTime.now();

        Optional<SensorsReading> optionalReading =
                sensorsRepository.findSensorsReadingByControllerIdAndReadingTypeAndTimestamp(dto.getControllerId(), type, timestamp);

        SensorsReading reading;

        if (optionalReading.isEmpty()) {
            reading = SensorsReading
                    .builder()
                    .controllerId(dto.getControllerId())
                    .readingType(type)
                    .temperature(dto.getTemperature())
                    .humidity(dto.getHumidity())
                    .aiq(dto.getAiq())
                    .uv((dto.getUv()))
                    .timestamp(timestamp)
                .build();
        } else {
            reading = optionalReading.get();
            reading.setUv(dto.getUv());
            reading.setHumidity(dto.getHumidity());
            reading.setAiq(dto.getAiq());
            reading.setTemperature(dto.getTemperature());
        }

        sensorsRepository.save(reading);
    }
}
