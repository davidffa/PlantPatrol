package pt.ua.deti.ies.plantpatrol.backend.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.rules.MicroController;
import pt.ua.deti.ies.plantpatrol.backend.repository.MicroControllerRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class MicroControllerService {

    private final MicroControllerRepository microControllerRepository;

    public List<MicroController> getAvailables(){
        return microControllerRepository.listAvailable();
    }

    public void updateGreenhouseId(String controllerId,String greenhouseId){microControllerRepository.updateGreenhouseId(controllerId, greenhouseId);}
}
