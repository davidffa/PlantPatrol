package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.CreateRoomDTO;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
import pt.ua.deti.ies.plantpatrol.backend.entity.Message;
import pt.ua.deti.ies.plantpatrol.backend.repository.ChatRoomRepository;

import java.util.Optional;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public Message createMessage(String chatRoomId, Message msg) {
        chatRoomRepository.createMessage(chatRoomId, msg);

        return msg;
    }

    public ChatRoom createChatRoom(String clientId) {
        return chatRoomRepository.save(ChatRoom.builder().clientId(clientId).build());
    }

    public String getChatRoom(String clientId) {
        for (ChatRoom chatRoom : chatRoomRepository.findAll()) {
            if (chatRoom.getClientId().equals(clientId)) {
                return chatRoom.getId();
            }
        }
        return null;
    }

    public ChatRoom getChatRoomByID(String chatRoomId) {
        return chatRoomRepository.findById(chatRoomId).orElse(null);
    }
}