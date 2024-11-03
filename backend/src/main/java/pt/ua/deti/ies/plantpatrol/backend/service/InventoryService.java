package pt.ua.deti.ies.plantpatrol.backend.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.inventory.GeminiResponseDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.repository.InventoryRepository;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class InventoryService {
    private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepository;
    private final GeminiService geminiService;
    private final GoogleSearchService googleSearchService;

    public boolean plantExists(String id) {
        return inventoryRepository.existsById(id);
    }

    public void createPlant(String plantName, int quantity) throws Exception {
        if (inventoryRepository.findByName(plantName).isPresent())
            throw new Exception("Name already exists!");

        Mono<GeminiResponseDTO> geminiResponse = geminiService.getPlantDetails(plantName);
        Mono<String> googleSearchResponse = googleSearchService.searchImage(plantName);

        Mono.zip(geminiResponse, googleSearchResponse).subscribe(
                results -> {
                    Plant plant = Plant
                            .builder()
                            .name(plantName)
                            .quantity(quantity)
                            .family(results.getT1().getFamily())
                            .maxHeight(results.getT1().getMaxHeight())
                            .about(results.getT1().getDescription())
                            .curiosities(results.getT1().getCuriosities())
                            .imageUrl(results.getT2())
                            .build();
                    inventoryRepository.save(plant);
                },
                error -> {
                    logger.error("An error occurred when fetching Gemini or Google Search API", error);
                }
        );
    }

    public void deletePlant(String id) {
        inventoryRepository.deleteById(id);
    }

    public void editMinimumPlant(String id, int minimum) {
        inventoryRepository.updateMinimumById(id, minimum);
    }

    public void editAvailablePlant(String id, int available) {
        inventoryRepository.updateAvailableById(id, available);
    }

    public void editPlantDetails(String id, String family, int maxHeight, String about, String curiosities){
        inventoryRepository.updateDetailsById(id, family, maxHeight, about, curiosities);
    }

    public List<Plant> searchByPlant(String name) {
        List<Plant> plants = new ArrayList<>();
        for (Plant plant : inventoryRepository.findAll()) {
            if (plant.getName().contains(name)) {
                plants.add(plant);
            }
        }
        return plants;
    }
}
