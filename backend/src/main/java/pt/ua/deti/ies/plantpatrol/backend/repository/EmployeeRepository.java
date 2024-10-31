package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;

import java.util.Optional;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    Optional<Employee> findByUsername(String username);
}
