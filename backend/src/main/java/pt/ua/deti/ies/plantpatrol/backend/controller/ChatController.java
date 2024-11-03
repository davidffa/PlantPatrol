package pt.ua.deti.ies.plantpatrol.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.entity.Message;
import pt.ua.deti.ies.plantpatrol.backend.repository.MessageRepository;
import pt.ua.deti.ies.plantpatrol.backend.service.ChatRoomService;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1")
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/chat")
    public void processMessage(@Payload Message chatMessage) {
        var chatId = chatRoomService
                .getChatId(chatMessage.getSenderId(),
                        chatMessage.getRecipientId(), true);

        chatMessage.setId(chatId.get());

        Message saved = messageRepository.save(chatMessage);
        messagingTemplate.convertAndSend("/chat/" + chatId, saved);
    }
    @GetMapping("/message/{senderId}/{recipientId}")
    public ResponseEntity<?> findChatMessages (@PathVariable String senderId,
                                               @PathVariable String recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId, false);
        var messages =
                chatId.map(cId -> messageRepository.findById(cId));
        return new ResponseEntity<>(messages, HttpStatus.OK) ;
    }

    @GetMapping("/message/{id}")
    public ResponseEntity<?> findMessage ( @PathVariable String id) {
        return new ResponseEntity<>
                (messageRepository
                        .findById(id)
                        .map(chatMessage ->
                            messageRepository.save(chatMessage)
                        ), HttpStatus.OK) ;
    }
}
