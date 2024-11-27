package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import pt.ua.deti.ies.plantpatrol.backend.entity.SensorsReading;
import pt.ua.deti.ies.plantpatrol.backend.enums.ReadingType;

import java.time.LocalDateTime;
import java.util.List;

public interface SensorsRepository extends MongoRepository<SensorsReading, String> {
    @Query("{ readingType: ?0, timestamp: { $gte: ?1, $lte: ?2 } }")
    List<SensorsReading> getReadingsBetweenDates(ReadingType type, LocalDateTime after, LocalDateTime before);

    
}
