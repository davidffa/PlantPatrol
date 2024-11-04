package pt.ua.deti.ies.plantpatrol.backend.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "alerts")
public class Alert {
    @Id
    private String id;

    @NotBlank
    private String message;

    @NotNull
    private Boolean fromSystem;

    @NotNull
    private Date timestamp;

    public Alert() {
        this.timestamp = new Date();
    }

    public Alert(String message, Boolean fromSystem) {
        this.message = message;
        this.fromSystem = fromSystem;
        this.timestamp = new Date();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getFromSystem() {
        return fromSystem;
    }

    public void setFromSystem(Boolean fromSystem) {
        this.fromSystem = fromSystem;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
