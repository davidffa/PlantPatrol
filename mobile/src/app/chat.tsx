import React, { useState, useRef, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import api from "@/services/api";
import { useUser } from "@/contexts/user";
import { AxiosError } from "axios";

type MessagePayload = {
  content: string,
  senderId: string,
  timestamp: string
}

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null); // Reference to the ScrollView
  const [webSocket, setWebSocket] = useState<WebSocket>()

  const { clientId } = useUser();

  function websocket() {
    try {
      const ws = new WebSocket(process.env.EXPO_PUBLIC_CHAT_WS_URL)

      ws.onopen = () => {
        ws.send(`{"chatRoomId":${clientId}}`)
      }
      ws.onmessage = (ev) => appendMessage(ev)
      setWebSocket(ws)
    } catch (error) {
      alert("Couldn't connect to the socket")
    }
  }

  useEffect(() => {
    const initializeChat = async () => {
      // Check if the chat room exists or create a new one
      try {
        const response = await api.get<MessagePayload[]>(`/chat/${clientId}`);
        const fetchedMessages = response.data;

        setMessages(fetchedMessages.map(msg => {
          return {
            ...msg,
            timestamp: formatDate(new Date(msg.timestamp))
          }
        }));
        setNewMessage("");
      } catch (error: any) {
        const err = error as AxiosError;

        if (err.status === 404) {
          await createChatRoom();
        }
      }

      websocket();
    };

    initializeChat();

    // Scroll chat down when the keyboard is opened
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => scrollViewRef.current?.scrollToEnd({ animated: false })
    );

    // Cleanup function to remove the keyboard listener
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const createChatRoom = async () => {
    try {
      await api.post(`/chat`, { chatRoomId: clientId });
    } catch (error: any) {
      if (error.response?.data?.includes("Multiple chat rooms")) {
        console.warn("Chat room already exists, avoiding duplicate creation.");
        return; // Avoid creating duplicate chat rooms
      }
    }
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages

    setNewMessage("");

    try {
      await api.post(`/chat/${clientId}`, { "content": newMessage }, {
        headers: {
          'senderId': clientId
        }
      })
    } catch (error) {
      alert("Coudn't send the message to the server!")
    }
  };

  function formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  }

  function appendMessage(ev: MessageEvent) {
    const msg: MessagePayload = JSON.parse(ev.data)
    if (msg.content.trim() !== "") {
      const newMessageObject: MessagePayload = {
        senderId: msg.senderId,
        content: msg.content,
        timestamp: formatDate(new Date(msg.timestamp))
      };
      setMessages(prev => [...prev, newMessageObject]);
      setNewMessage(""); // Clear the input field
    }
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-slate-200">
        {/* Header */}
        <View className="flex flex-row items-center mt-8 p-8">
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => { router.back(); webSocket?.close() }} />
          <Text className="text-3xl font-bold text-green ml-8">PlantPatrol</Text>
        </View>

        {/* Chat container */}
        <View className="flex-1 mx-6 mb-6 bg-white rounded-lg p-1">
          <ScrollView
            className="flex-1"
            ref={scrollViewRef} // Attach the ref to the ScrollView
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
          >
            {messages.map((m, idx) => (
              m.senderId !== clientId ? (
                <View key={idx} className="bg-blue-100 rounded-xl m-2 p-3 self-start max-w-[80%]">
                  <Text className="text-black text-left">{m.content}</Text>
                  <Text className="text-xs text-gray-500 text-right mt-1">{m.timestamp}</Text>
                </View>
              ) : (
                <View key={idx} className="bg-green rounded-lg m-2 p-3 self-end max-w-[80%]">
                  <Text className="text-white text-right">{m.content}</Text>
                  <Text className="text-xs text-white  text-right mt-1">{m.timestamp}</Text>
                </View>
              )
            ))
            }
          </ScrollView>
        </View>

        {/* Input */}
        <View className="flex-row items-center px-3 mb-8 mx-6">
          <Ionicons name="happy-outline" size={24} color="gray" />
          <TextInput
            className="flex-1 max-h-32 rounded-lg px-4 py-2 mx-2 bg-white border border-gray-300"
            placeholder="Write your message"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage} disabled={newMessage.trim() === ""}>
            <Ionicons name="send" size={24} color={newMessage.trim() === "" ? "gray" : "black"} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
