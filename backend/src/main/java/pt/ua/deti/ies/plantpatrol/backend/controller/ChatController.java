package pt.ua.deti.ies.plantpatrol.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.CreateRoomDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
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

    @PostMapping("/chat/{chatRoomId}")
    public ResponseEntity<?> processMessage(@PathVariable String clientId, @RequestBody Message message) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        message.setSenderId(auth.getPrincipal().toString());
        var chatId = chatRoomService.getChatRoom(clientId);

        Message saved = messageRepository.save(message);
        messagingTemplate.convertAndSend("/chat/" + chatId, saved);

        return new ResponseEntity<>(saved, HttpStatus.OK);

    }

    @GetMapping("/chat/{chatRoomId}")
    public ResponseEntity<?> findChatMessages (@PathVariable String chatRoomId) {
        ChatRoom chatRoom = chatRoomService.getChatRoomByID(chatRoomId);
        return new ResponseEntity<>(chatRoom.getMessages(), HttpStatus.OK) ;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> createChat(@RequestBody CreateRoomDTO dto) {
        ChatRoom chatRoom = chatRoomService.createChatRoom(dto.getClientId());
        return new ResponseEntity<>(chatRoom, HttpStatus.OK) ;
    }

}
