package pt.ua.deti.ies.plantpatrol.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;

import java.util.Optional;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    Optional<Employee> findByUsername(String username);

    @Query("{ _id: ?0 }")
    @Update("{ $set: { notes: ?1 } }")
    void updateNotesById(String id, String notes);


    @Query("{_id: ?0}")
    @Update("{ $set:  { password: ?1 }}")
    void updatePasswordById(String id, String password);
}
