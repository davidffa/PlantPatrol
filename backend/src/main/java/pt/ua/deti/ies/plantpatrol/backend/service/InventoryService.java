package pt.ua.deti.ies.plantpatrol.backend.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.repository.InventoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class InventoryService {
    private static final Logger logger = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepository;
    private final GeminiService geminiService;

    public boolean plantExists(String id) {
        return inventoryRepository.existsById(id);
    }

    public void createPlant(String plantName, int quantity) throws Exception {
        if (inventoryRepository.findByName(plantName).isPresent())
            throw new Exception("Name already exists!");

        geminiService.getPlantDetails(plantName).subscribe(
                response -> {
                    Plant plant = Plant
                            .builder()
                            .name(plantName)
                            .quantity(quantity)
                            .family(response.getFamily())
                            .maxHeight(response.getMaxHeight())
                            .about(response.getDescription())
                            .curiosities(response.getCuriosities())
                            .build();
                    inventoryRepository.save(plant);
                },
                error -> {
                    logger.error("An error occurred when fetching Gemini API", error);
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
