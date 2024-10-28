package pt.ua.deti.ies.plantpatrol.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateEmployeeDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    private String address;

    private Date birthDate;

    private String notes;
}
