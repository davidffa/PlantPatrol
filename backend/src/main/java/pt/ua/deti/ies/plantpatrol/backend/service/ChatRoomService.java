package pt.ua.deti.ies.plantpatrol.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
import pt.ua.deti.ies.plantpatrol.backend.utils.MessagePayload;
import pt.ua.deti.ies.plantpatrol.backend.repository.ChatRoomRepository;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public MessagePayload createMessage(String chatRoomId, MessagePayload msg) {
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