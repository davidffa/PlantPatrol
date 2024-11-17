package pt.ua.deti.ies.plantpatrol.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.CreateMessageDTO;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.CreateRoomDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
import pt.ua.deti.ies.plantpatrol.backend.entity.Employee;
import pt.ua.deti.ies.plantpatrol.backend.utils.MessagePayload;
import pt.ua.deti.ies.plantpatrol.backend.service.ChatRoomService;

@RestController
@RequestMapping("/api/v1")
public class ChatController {
    @Autowired
    private ChatRoomService chatRoomService;

    @Operation(summary = "Creat a new message in a specified chatRoom")
    @PostMapping("/chat/{chatRoomId}")
    public ResponseEntity<?> processMessage(@RequestHeader(required = false) String senderId, @PathVariable String chatRoomId, @RequestBody CreateMessageDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        MessagePayload msg = MessagePayload.builder().content(dto.getContent()).build();

        if (auth.getPrincipal() instanceof Employee issuer) {
            msg.setOriginId(issuer.getId());
        } else {
            if (senderId == null) {
                return ResponseEntity.badRequest().build();
            }

            msg.setOriginId(senderId);
        }

        return new ResponseEntity<>(chatRoomService.createMessage(chatRoomId, msg), HttpStatus.OK);

    }
    @Operation(summary = "Have all the messages in a specified chatRoom")
    @GetMapping("/chat/{chatRoomId}")
    public ResponseEntity<?> findChatMessages (@PathVariable String chatRoomId) {
        ChatRoom chatRoom = chatRoomService.getChatRoomByID(chatRoomId);
        return new ResponseEntity<>(chatRoom.getMessagePayloads(), HttpStatus.OK) ;
    }

    @Operation(summary = "Create a new chatRoom")
    @PostMapping("/chat")
    public ResponseEntity<?> createChat(@RequestBody CreateRoomDTO dto) {
        ChatRoom chatRoom = chatRoomService.createChatRoom(dto.getClientId());
        return new ResponseEntity<>(chatRoom, HttpStatus.OK) ;
    }

}
