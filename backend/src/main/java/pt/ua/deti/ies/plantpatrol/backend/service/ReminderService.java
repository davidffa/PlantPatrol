package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.Reminder;
import pt.ua.deti.ies.plantpatrol.backend.repository.InventoryRepository;
import pt.ua.deti.ies.plantpatrol.backend.repository.ReminderRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class ReminderService {
    private final ReminderRepository reminderRepository;
    private final InventoryRepository inventoryRepository;

    public ReminderService(ReminderRepository reminderRepository, InventoryRepository inventoryRepository) {
        this.reminderRepository = reminderRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public Set<String> getReminders(UUID clientId) {
        Optional<Reminder> existingReminder = reminderRepository.findByClientId(clientId.toString());

        if (existingReminder.isEmpty())
            throw new IllegalArgumentException("Invalid client id");

        Reminder reminder = existingReminder.get();

        return reminder.getPlants();
    }

    public void addPlant(UUID clientId, String plantId) {
        Optional<Reminder> existingReminder = reminderRepository.findByClientId(clientId.toString());

        if (inventoryRepository.findById(plantId).isEmpty()) {
            throw new IllegalArgumentException("Plant does not exist");
        }

        if (existingReminder.isEmpty()) {
            Reminder r = Reminder.builder().clientId(clientId.toString()).plants(Set.of(plantId)).build();
            reminderRepository.save(r);
            return;
        }

        Reminder r = existingReminder.get();

        r.getPlants().add(plantId);
    }

    public void removePlant(UUID clientId, String plantId) {
        Optional<Reminder> existingReminder = reminderRepository.findByClientId(clientId.toString());

        if (existingReminder.isEmpty())
            throw new IllegalArgumentException("Reminder does not exist");

        Reminder r = existingReminder.get();

        r.getPlants().remove(plantId);

        reminderRepository.save(r);
    }
}
