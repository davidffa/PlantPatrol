package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.alert.CreateAlertDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.Alert;
import pt.ua.deti.ies.plantpatrol.backend.repository.AlertRepository;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class AlertService {

    @Autowired
    private final AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public Alert sendAlert(CreateAlertDTO dto) {
        Alert alert = Alert.builder()
                .title(dto.getTitle())
                .message(dto.getMessage())
                .sendto(dto.getSendto())
                .timestamp(Date.from(Instant.now()))
                .build();
        return alertRepository.insert(alert);
    }

    public List<Alert> findAll() {
        return alertRepository.findAll();
    }

}
