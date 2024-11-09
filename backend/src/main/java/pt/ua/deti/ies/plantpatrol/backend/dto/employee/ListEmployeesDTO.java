package pt.ua.deti.ies.plantpatrol.backend.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListEmployeesDTO {
    private String id;
    private String name;
    private int age;
}
