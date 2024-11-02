package pt.ua.deti.ies.plantpatrol.backend.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.repository.InventoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public boolean plantExists(String id) {
        return inventoryRepository.existsById(id);
    }

    public Plant createPlant(Plant plt) throws Exception {
        if (inventoryRepository.findByName(plt.getName()).isPresent())
            throw new Exception("Name already exists!");

        Plant plant = Plant
                .builder()
                .name(plt.getName())
                .minimum(plt.getMinimum())
                .available(plt.getAvailable())
                .family(plt.getFamily())
                .size(plt.getSize())
                .about(plt.getAbout())
                .curiosities(plt.getCuriosities())
                .build();

        plant = inventoryRepository.save(plant);

        return plant;
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

    public void editPlantDetails(String id, String family, String size, String about, String curiosities){
        inventoryRepository.updateDetailsById(id, family, size, about, curiosities);
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
