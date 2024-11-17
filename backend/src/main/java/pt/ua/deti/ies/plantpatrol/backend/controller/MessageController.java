package pt.ua.deti.ies.plantpatrol.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import pt.ua.deti.ies.plantpatrol.backend.utils.MessagePayload;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
public class MessageController {

    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/employees")
    public Message sendMessage(Message message) {
        String content = new String( (byte[]) message.getPayload(), StandardCharsets.UTF_8);
        log.info("[E] Message received: {}",content);
        log.info("[E] Message headers: {}",message.getHeaders());
        return message;
    }

    @MessageMapping("/clients")
    public Message sendMessageClient(Message message) {
        log.info("[C] Message received: {}", message);
        log.info(message.getPayload().toString());
        return message;
    }

}


