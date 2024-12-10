package pt.ua.deti.ies.plantpatrol.backend.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.inventory.GeminiResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Alert;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.repository.AlertRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.InventoryRepository;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class InventoryService {
    private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepository;
    private final GeminiService geminiService;
    private final GoogleSearchService googleSearchService;
    private final PushNotificationService pushNotificationService;
    private final AlertRepository alertRepository;

    public boolean plantExists(String id) {
        return inventoryRepository.existsById(id);
    }

    public Plant createPlant(String plantName, int amount) throws Exception {
        if (inventoryRepository.findByName(plantName).isPresent())
            throw new Exception("Name already exists!");

        Plant newPlant = Plant
                .builder()
                .name(plantName)
                .amount(amount)
                .build();

        Plant savedPlant = inventoryRepository.save(newPlant);

        Mono<GeminiResponseDTO> geminiResponse = geminiService.getPlantDetails(plantName);
        Mono<String> googleSearchResponse = googleSearchService.searchImage(plantName);

        Mono.zip(geminiResponse, googleSearchResponse).subscribe(
                results -> {
                    newPlant.setFamily(results.getT1().getFamily());
                    newPlant.setMaxHeight(results.getT1().getMaxHeight());
                    newPlant.setAbout(results.getT1().getDescription());
                    newPlant.setCuriosities(results.getT1().getCuriosities());
                    newPlant.setImageUrl(results.getT2());

                    inventoryRepository.save(newPlant);
                },
                error -> logger.error("An error occurred when fetching Gemini or Google Search API", error));

        return savedPlant;
    }

    public void deletePlant(String id) {
        inventoryRepository.deleteById(id);
    }

    public void editMinimumPlant(String id, int minimum) {
        Optional<Plant> optionalPlant = inventoryRepository.findById(id);
        if (optionalPlant.isEmpty()) return;

        Plant plant = optionalPlant.get();

        inventoryRepository.updateMinimumById(id, minimum);

        if (plant.getAmount() < minimum) {
            Alert alert = Alert.builder()
                    .title("SYSTEM: Plant - "+ plant.getName() + " - is running low")
                    .message("The quantity of "+plant.getName()+" is less that the minimum." +
                            " Maybe it's a good idea to add this plant to the next order. ")
                    .sendto("Everyone")
                    .fromSystem(true)
                    .timestamp(Date.from(Instant.now()))
                    .build();
            alertRepository.insert(alert);
        }
    }

    public void editAvailablePlant(String id, int available) {
        Optional<Plant> optionalPlant = inventoryRepository.findById(id);
        if (optionalPlant.isEmpty()) return;

        Plant plant = optionalPlant.get();

        if (plant.getAmount() == 0 && available > 0) {
            pushNotificationService.sendNotificationsForPlant(id);
        }

        inventoryRepository.updateAvailableById(id, available);
        if (plant.getMinimum() > available) {
            Alert alert = Alert.builder()
                    .title("SYSTEM: Plant - "+ plant.getName() + " - is running low")
                    .message("The quantity of "+plant.getName()+" is less that the minimum." +
                            " Maybe it's a good idea to add this plant to the next order. ")
                    .sendto("Everyone")
                    .fromSystem(true)
                    .timestamp(Date.from(Instant.now()))
                    .build();
            alertRepository.insert(alert);
        }
    }

    public void editPlantDetails(String id, String imageUrl, String family, int maxHeight, String about, String curiosities) {
        inventoryRepository.updateDetailsById(id,imageUrl, family, maxHeight, about, curiosities);
    }

    public List<Plant> searchByPlant(String name) {
        return inventoryRepository.searchPlantsByName(name);
    }

    public Plant getPlant(String id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    public List<Plant> getPlants(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        return inventoryRepository.findAll(pageable).toList();
    }
}
