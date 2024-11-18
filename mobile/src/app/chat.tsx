import React, { useState, useRef, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Chat() {
  const router = useRouter();

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Good afternoon.\nLast month I bought two May flowers and have been watering them every day.\nHowever, they seem to me to be withered.\nCould you help me?",
      time: "15:34",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null); // Reference to the ScrollView

  useEffect(() => {
    // Scroll chat down when the keyboard is opened
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => scrollViewRef.current?.scrollToEnd({ animated: false })
    )

    return () => keyboardDidShowListener.remove();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages

    const newMessageObject = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessageObject]);
    setNewMessage(""); // Clear the input field
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-slate-200">
        {/* Header */}
        <View className="flex flex-row items-center mt-8 p-8">
          <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
          <Text className="text-3xl font-bold text-green ml-8">PlantPatrol</Text>
        </View>

        {/* Chat container */}
        <View className="flex-1 mx-6 mb-6 bg-white rounded-lg p-3">
          <ScrollView
            className="flex-1"
            ref={scrollViewRef} // Attach the ref to the ScrollView
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
          >
            {messages.map((message) => (
              <View key={message.id} className="bg-blue-100 rounded-lg m-2 p-3 self-end max-w-[80%]">
                <Text className="text-black">{message.text}</Text>
                <Text className="text-xs text-gray-500 text-right mt-1">{message.time}</Text>
              </View>
            ))}
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
