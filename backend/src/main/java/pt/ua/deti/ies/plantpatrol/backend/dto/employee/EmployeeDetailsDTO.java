package pt.ua.deti.ies.plantpatrol.backend.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDetailsDTO {
    private String name;
    private int age;
    private String address;
    private String notes;
    private String phoneNumber;
    private LocalDate employeeSince;
}
