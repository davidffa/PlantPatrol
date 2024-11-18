package pt.ua.deti.ies.plantpatrol.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateEmployeeDTO {
    private String firstName;
    private String lastName;
    private String phoneNumber;

    private String address;

    private LocalDate birthDate;

    private String notes;
}
