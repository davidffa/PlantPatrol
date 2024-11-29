package pt.ua.deti.ies.plantpatrol.backend.datastreams;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Materialized;
import org.apache.kafka.streams.kstream.TimeWindows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.plantpatrol.backend.dto.SensorsReadingDTO;

import java.io.IOException;
import java.time.Duration;

@Component
public class Processor {
    private static final Serde<String> STRING_SERDE = Serdes.String();
    private static final Serde<SensorsReadingDTO> READING_SERDE = new SensorsReadingSerde();
    private static final Serde<ReadingsHelper> READINGS_HELPER_SERDE = new ReadingsHelperSerde();

    @Autowired
    public void process(StreamsBuilder streamsBuilder) {
        KStream<String, SensorsReadingDTO> messageStream = streamsBuilder
                .stream("sensors", Consumed.with(STRING_SERDE, READING_SERDE));

        ReadingsHelper initial = new ReadingsHelper();

        // TODO: Change minute to hourly, and make daily, weekly and monthly

        messageStream
                .groupBy((k, v) -> v.getControllerId())
                .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(1)))
                .aggregate(
                        () -> initial,
                        (key, value, aggregate) -> {
                            aggregate.setControllerId(value.getControllerId());
                            aggregate.setUv(aggregate.getUv() + value.getUv());
                            aggregate.setTemperature(aggregate.getTemperature() + value.getTemperature());
                            aggregate.setAiq(aggregate.getAiq() + value.getAiq());
                            aggregate.setHumidity(aggregate.getHumidity() + value.getHumidity());
                            aggregate.setCount(aggregate.getCount() + 1);
                            return aggregate;
                        },
                        Materialized.with(STRING_SERDE, READINGS_HELPER_SERDE)
                )
                .toStream()
                .mapValues(v ->
                    SensorsReadingDTO
                            .builder()
                            .controllerId(v.getControllerId())
                            .humidity(v.getHumidity() / v.getCount())
                            .temperature(v.getTemperature() / v.getCount())
                            .aiq(v.getAiq() / v.getCount())
                            .uv(v.getUv() / v.getCount())
                            .build()
                )
                .to("hourly-sensors-avg");
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class ReadingsHelper {
        private String controllerId;
        private double aiq = 0;
        private double uv = 0;
        private double temperature = 0;
        private double humidity = 0;
        private int count = 0;
    }

    public static class ReadingsHelperSerde extends Serdes.WrapperSerde<ReadingsHelper> {
        public ReadingsHelperSerde() {
            super(new ReadingsHelperSerializer(), new ReadingsHelperDeserializer());
        }
    }

    private static class ReadingsHelperSerializer implements Serializer<ReadingsHelper> {
        private final ObjectMapper objectMapper = new ObjectMapper();

        @Override
        public byte[] serialize(String s, ReadingsHelper readingsHelper) {
            try {
                return objectMapper.writeValueAsBytes(readingsHelper);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private static class ReadingsHelperDeserializer implements Deserializer<ReadingsHelper> {
        private final ObjectMapper objectMapper = new ObjectMapper();

        @Override
        public ReadingsHelper deserialize(String s, byte[] bytes) {
            try {
                return objectMapper.readValue(bytes, ReadingsHelper.class);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static class SensorsReadingSerde extends Serdes.WrapperSerde<SensorsReadingDTO> {
        public SensorsReadingSerde() {
            super(new SensorsReadingSerializer(), new SensorsReadingDeserializer());
        }
    }

    private static class SensorsReadingSerializer implements Serializer<SensorsReadingDTO> {
        private final ObjectMapper objectMapper = new ObjectMapper();

        @Override
        public byte[] serialize(String s, SensorsReadingDTO sensorsReadingDTO) {
            try {
                return objectMapper.writeValueAsBytes(sensorsReadingDTO);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private static class SensorsReadingDeserializer implements Deserializer<SensorsReadingDTO> {
        private final ObjectMapper objectMapper = new ObjectMapper();

        @Override
        public SensorsReadingDTO deserialize(String s, byte[] bytes) {
            try {
                return objectMapper.readValue(bytes, SensorsReadingDTO.class);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
