package pt.ua.deti.ies.plantpatrol.backend.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import pt.ua.deti.ies.plantpatrol.backend.entity.ChatRoom;
import pt.ua.deti.ies.plantpatrol.backend.dto.chat.MessagePayload;
import pt.ua.deti.ies.plantpatrol.backend.repository.ChatRoomRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatRoomService extends TextWebSocketHandler {
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    // sessionId <-> ws session
    private final Map<String, WebSocketSession> sessions = new HashMap<>();
    // chatRoomId <-> session ids
    private final Map<String, List<String>> chatRoomSessions = new HashMap<>();

    public MessagePayload createMessage(String chatRoomId, MessagePayload msg) {
        chatRoomRepository.createMessage(chatRoomId, msg);

        List<String> sessionIds = chatRoomSessions.get(chatRoomId);

        if (sessionIds != null) {
            JSONObject json = new JSONObject(msg);

            sessionIds.forEach(sId -> {
                try {
                    sessions.get(sId).sendMessage(new TextMessage(json.toString()));
                } catch (Exception ignored) { }
            });
        }

        return msg;
    }

    public ChatRoom createChatRoom(String clientId) {
        return chatRoomRepository.save(ChatRoom.builder().chatRoomId(clientId).messages(List.of()).build());
    }

    public ChatRoom getChatRoomByID(String chatRoomId) {
        return chatRoomRepository.findChatRoomByChatRoomId(chatRoomId).orElse(null);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JSONObject json = new JSONObject(message.getPayload());
        String chatRoomId = json.getString("chatRoomId");

        this.chatRoomSessions.putIfAbsent(chatRoomId, new ArrayList<>());
        this.chatRoomSessions.get(chatRoomId).add(session.getId());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
    }
}