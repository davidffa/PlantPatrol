package pt.ua.deti.ies.plantpatrol.backend.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import pt.ua.deti.ies.plantpatrol.backend.entity.Plant;
import pt.ua.deti.ies.plantpatrol.backend.entity.Reminder;
import pt.ua.deti.ies.plantpatrol.backend.repository.InventoryRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.ReminderRepository;

import java.util.List;

@Service
public class PushNotificationService {
    private final ReminderRepository reminderRepository;
    private final WebClient webClient;
    private final InventoryRepository inventoryRepository;

    public PushNotificationService(ReminderRepository reminderRepository, WebClient webClient, InventoryRepository inventoryRepository) {
        this.reminderRepository = reminderRepository;
        this.webClient = webClient;
        this.inventoryRepository = inventoryRepository;
    }

    public void sendNotificationsForPlant(String plantId) {
        List<Reminder> reminders = reminderRepository.findRemindersForPlantId(plantId);
        List<String> pushTokens = reminders.stream().map(Reminder::getPushToken).toList();

        if (pushTokens.isEmpty()) return;

        Plant plant = inventoryRepository.findById(plantId).orElseThrow();

        webClient.post()
                .uri("https://exp.host/--/api/v2/push/send")
                .bodyValue(buildExpoNotificationsBody(pushTokens, plant.getName()))
                .retrieve()
                .toBodilessEntity()
                .subscribe();
    }

    private String buildExpoNotificationsBody(List<String> pushTokens, String plantName) {
        return new JSONObject()
                .put("to", pushTokens)
                .put("title", "Plant available")
                .put("body", String.format("The plant %s is now available for purchase!", plantName))
                .put("priority", "high")
                .put("channelId", "Plant Reminders")
                .toString();
    }
}
