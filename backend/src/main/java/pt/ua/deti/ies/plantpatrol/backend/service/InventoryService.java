package pt.ua.deti.ies.plantpatrol.backend.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.inventory.GeminiResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.repository.InventoryRepository;
import reactor.core.publisher.Mono;

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

    public boolean plantExists(String id) {
        return inventoryRepository.existsById(id);
    }

    public void createPlant(String plantName, int amount) throws Exception {
        if (inventoryRepository.findByName(plantName).isPresent())
            throw new Exception("Name already exists!");

        Mono<GeminiResponseDTO> geminiResponse = geminiService.getPlantDetails(plantName);
        Mono<String> googleSearchResponse = googleSearchService.searchImage(plantName);

        Mono.zip(geminiResponse, googleSearchResponse).subscribe(
                results -> {
                    Plant plant = Plant
                            .builder()
                            .name(plantName)
                            .amount(amount)
                            .family(results.getT1().getFamily())
                            .maxHeight(results.getT1().getMaxHeight())
                            .about(results.getT1().getDescription())
                            .curiosities(results.getT1().getCuriosities())
                            .imageUrl(results.getT2())
                            .build();
                    inventoryRepository.save(plant);
                },
                error -> logger.error("An error occurred when fetching Gemini or Google Search API", error));
    }

    public void deletePlant(String id) {
        inventoryRepository.deleteById(id);
    }

    public void editMinimumPlant(String id, int minimum) {
        inventoryRepository.updateMinimumById(id, minimum);
    }

    public void editAvailablePlant(String id, int available) {
        Optional<Plant> optionalPlant = inventoryRepository.findById(id);
        if (optionalPlant.isEmpty()) return;

        Plant plant = optionalPlant.get();

        if (plant.getAmount() == 0 && available > 0) {
            pushNotificationService.sendNotificationsForPlant(id);
        }

        inventoryRepository.updateAvailableById(id, available);
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
