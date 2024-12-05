package pt.ua.deti.ies.plantpatrol.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.CreateMessageDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.CreateRoomDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.MessagePayload;
import pt.ua.deti.ies.plantpatrol.backend.service.ChatRoomService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.time.Instant;

@RestController
@RequestMapping("/api/v1")
public class ChatController {
    @Autowired
    private ChatRoomService chatRoomService;

    @Operation(summary = "Creat a new message in a specified chatRoom")
    @PostMapping("/chat/{chatRoomId}")
    public ResponseEntity<?> processMessage(@RequestHeader(required = false) String senderId, @PathVariable String chatRoomId, @RequestBody CreateMessageDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        MessagePayload msg = MessagePayload.builder()
                .content(dto.getContent())
                .timestamp(LocalDateTime.now())
                .build();

        if (auth.getPrincipal() instanceof Employee issuer) {
            msg.setSenderId(issuer.getId());
        } else {
            if (senderId == null) {
                return ResponseEntity.badRequest().build();
            }

            msg.setSenderId(senderId);
        }

        return new ResponseEntity<>(chatRoomService.createMessage(chatRoomId, msg), HttpStatus.OK);

    }
    @Operation(summary = "Have all the messages in a specified chatRoom")
    @GetMapping("/chat/{chatRoomId}")
    public ResponseEntity<?> findChatMessages (@PathVariable String chatRoomId) {
        ChatRoom chatRoom = chatRoomService.getChatRoomByID(chatRoomId);

        if (chatRoom == null)
            return ResponseEntity.notFound().build();

        List<MessagePayload> messages = chatRoom.getMessages();
        if (messages == null) {
            messages = new ArrayList<>();
        }

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
    @Operation(summary = "Have all the chatRoom")
    @GetMapping("/chatRooms")
    public ResponseEntity<?> getChats () {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth.getPrincipal() instanceof Employee ) {
            return new ResponseEntity<>(chatRoomService.getChatRooms(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @Operation(summary = "Create a new chatRoom")
    @PostMapping("/chat")
    public ResponseEntity<?> createChat(@RequestBody CreateRoomDTO dto) {
        ChatRoom chatRoom = chatRoomService.createChatRoom(dto.getChatRoomId());
        return new ResponseEntity<>(chatRoom, HttpStatus.OK);
    }

}
