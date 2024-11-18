package pt.ua.deti.ies.plantpatrol.backend.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
import pt.ua.deti.ies.plantpatrol.backend.utils.MessagePayload;
import pt.ua.deti.ies.plantpatrol.backend.repository.ChatRoomRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatRoomService extends TextWebSocketHandler {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    private Map<String, List<WebSocketSession>> socketSessions = new HashMap<>();
    private Map<String,String> sessionsId  = new HashMap<>();

    public MessagePayload createMessage(String chatRoomId, MessagePayload msg) {
        chatRoomRepository.createMessage(chatRoomId, msg);

        socketSessions.get(chatRoomId).forEach(socketSession -> {
            JSONObject json = new JSONObject()
                    .put("message", msg.getContent())
                    .put("sender", msg.getOriginId());

            try {
                socketSession.sendMessage(new TextMessage(json.toString()));
            } catch (IOException ignored) {

            }
        });

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

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String id = session.getHandshakeHeaders().getFirst("chatRoomId");
        if (id == null) {
            session.close();
            return;
        }
        this.socketSessions.putIfAbsent(session.getId(), new ArrayList<>());
        this.socketSessions.get(session.getId()).add(session);
        this.sessionsId.put(session.getId(), id);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        this.socketSessions.get(session.getId()).remove(session);
        this.sessionsId.remove(session.getId());
    }
}