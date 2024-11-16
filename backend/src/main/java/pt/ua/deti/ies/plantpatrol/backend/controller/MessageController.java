package pt.ua.deti.ies.plantpatrol.backend.controller;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/employee")
    @SendTo("/employee")
    public Message sendMessage(Message message) {
        return message;
    }
}


