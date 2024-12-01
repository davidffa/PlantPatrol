package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import pt.ua.deti.ies.plantpatrol.backend.entity.SensorsReading;
import pt.ua.deti.ies.plantpatrol.backend.enums.ReadingType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SensorsRepository extends MongoRepository<SensorsReading, String> {
    Optional<SensorsReading> findSensorsReadingByControllerIdAndReadingType(String controllerId, ReadingType readingType);

    Optional<SensorsReading> findSensorsReadingByControllerIdAndReadingTypeAndTimestamp(String controllerId, ReadingType readingType, LocalDateTime timestamp);

    @Query("{ controllerId: { $in: ?0 }, readingType: ?1 }")
    List<SensorsReading> getInstantReadings(List<String> controllerIds, ReadingType type);

    @Query("{ controllerId: { $in: ?0 }, readingType: ?1, timestamp: { $gte: ?2, $lte: ?3 } }")
    List<SensorsReading> getReadingsBetweenDates(List<String> controllerIds, ReadingType type, LocalDateTime after, LocalDateTime before);

    @Aggregation( pipeline = {
        "{ $match: { readingType: 'WEEKLY', controllerId: { $in: ?0 }, timestamp: { $gte: ?1, $lte: ?2 } } }",
        "{ $addFields: { 'year': { $year: '$timestamp' }, 'month': { $month: '$timestamp' } } }",
        "{ $group: { _id: { year: '$year', month: '$month', controllerId: '$controllerId' }, uv: { $avg: '$uv' }, temperature: { $avg: '$temperature' }, aiq: { $avg: '$aiq' }, humidity: { $avg: '$humidity' } } }",
        "{ $project: { controllerId: '$_id.controllerId', readingType: 'MONTHLY', uv: '$uv', temperature: '$temperature', aiq: '$aiq', humidity: '$humidity', timestamp: { $dateFromParts: { year: '$_id.year', month: '$_id.month', day: 1 } } } }"
    })
    List<SensorsReading> aggregateMonthlyData(List<String> controllerIds, LocalDateTime after, LocalDateTime before);
}
