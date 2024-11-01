package pt.ua.deti.ies.plantpatrol.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.GreenHouse;
import pt.ua.deti.ies.plantpatrol.backend.repository.GreenHouseRepository;

import java.util.List;

@Service
public class GreenHouseService {

    private final GreenHouseRepository greenHouseRepository;

    public GreenHouseService(GreenHouseRepository greenHouseRepository) {
        this.greenHouseRepository = greenHouseRepository;
    }

    public List<GreenHouse> getGreenHouses() {
       return greenHouseRepository.findAll();
    }

    public GreenHouse getGreenHouseName(String name) {
        return greenHouseRepository.findGreenHouseByName(name);
    }

    public void createGreenHouses(List<GreenHouse> greenHouse) {
        greenHouseRepository.saveAll(greenHouse);
    }
    public void createGreenHouse(GreenHouse greenHouse) {
        greenHouseRepository.save(greenHouse);
    }
    public void updateGreenHouse(GreenHouse greenHouse) {
        greenHouseRepository.save(greenHouse);
    }
    public void deleteGreenHouse(GreenHouse greenHouse) {
        greenHouseRepository.delete(greenHouse);
    }
}
