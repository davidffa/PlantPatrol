package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.plantpatrol.backend.entity.SensorsReading;
import pt.ua.deti.ies.plantpatrol.backend.enums.ReadingType;

import java.time.LocalDateTime;
import java.util.Optional;

public interface SensorsRepository extends MongoRepository<SensorsReading, String> {
    Optional<SensorsReading> findSensorsReadingByControllerIdAndReadingType(String controllerId, ReadingType readingType);

    Optional<SensorsReading> findSensorsReadingByControllerIdAndReadingTypeAndTimestamp(String controllerId, ReadingType readingType, LocalDateTime timestamp);
}
