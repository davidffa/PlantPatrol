"use client";
import { Navbar } from '@/components/Navbar';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import api from '@/services/api';
import { useAuth } from '../../contexts/auth';
import withAuth from '@/lib/withAuth';
import { env } from 'next-runtime-env';

type MessagePayload = {
  content: string,
  senderId: string,
  timestamp: string
}
type Room = {
  id: string;
  chatRoomId: string;
  messages: MessagePayload[];
};

function EmployeeChat() {
  const { user } = useAuth()
  // List of users with chat histories
  const [chatRooms, setChatRooms] = useState<Room[]>([]);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const chatBox = useRef<HTMLDivElement | null>(null);
  // Create a reference for the last message
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const getChatRooms = async () => {
    const res = await api.get<Room[]>("/chatRooms")
    const data = res.data.map(room => {
      return {
        ...room,
        messages: room.messages.map(msg => {
          return {
            ...msg,
            timestamp: formatDate(new Date(msg.timestamp))
          }
        })
      }
    })
    setChatRooms(data);
  }

  // Automatically scroll to the last message when the messages change
  useEffect(() => {
    getChatRooms()
  }, []);

  function formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  }

  function appendMessage(ev: MessageEvent) {
    const msg: MessagePayload = JSON.parse(ev.data)
    if (msg.content.trim() !== "") {
      setSelectedRoom((prevRoom) => {
        if (!prevRoom) return null; // Handle null case
        return {
          ...prevRoom,
          messages: [...prevRoom.messages, { ...msg, timestamp: formatDate(new Date(msg.timestamp)) }], // Correctly concatenate messages
        };
      });
    }
  }

  async function handleSelectRoom(Room: Room) {

    //connection to the socket
    try {
      if (webSocket != null) {
        webSocket.close()
      }
      const ws = new WebSocket(env("NEXT_PUBLIC_CHAT_WS_URL") ?? "ws://localhost:8080/chat")
      setWebSocket(ws)
      setSelectedRoom(Room)
      ws.onopen = () => {
        ws.send(`{"chatRoomId":"${Room.chatRoomId}"}`)
        console.log("Socket Open")
      }
      ws.onclose = () => {
        console.log("Websocket Closed")
      }
      ws.onerror = () => {
        console.log("Websocket Error")
      }
      ws.onmessage = (ev) => appendMessage(ev)
    }
    catch (error) {
      console.log(error)
    }
    //send chatRoomId 
  }
  // Function to add a new message for the selected user
  const sendMessage = async () => {

    const res = await api.post(`/chat/${selectedRoom?.chatRoomId}`, { content: newMessage })
    if (res.status == 200) {
      // scroll to the bottom
      chatBox.current?.scrollIntoView({ behavior: "smooth" })
    }
  };

  // Find the selected user to display their messages
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {chatRooms.length != 0 ? (
        <div className="flex-grow w-full flex h-full overflow-hidden">

          {/* List of clients */}
          <div className="w-1/4 flex flex-col divide-y divide-slate-300 bg-zinc-50 h-full overflow-auto">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                className={`w-full flex flex-row p-4 cursor-pointer ${room.id === selectedRoom?.chatRoomId ? 'bg-gray-200' : ''}`}
                onClick={() => handleSelectRoom(room)}
              >
                <Image src="/blue-user.svg" height={30} width={30} alt="User avatar" className="w-1/8 mr-6" />
                <div className="mt-1">Chat Room {room.chatRoomId}</div>
              </div>
            ))}
          </div>

          {/* Chat box */}
          <div className="w-3/4 flex flex-col h-full bg-slate-200 rounded-lg shadow-lg">
            {/* Header with avatar and user name */}
            <div className="flex items-center p-4 border-b bg-slate-200 rounded-t-lg">
              <div className='rounded-full bg-white mx-6 w-12 h-12 '>
                <Image src='/blue-user.svg' height={38} width={38} alt="Avatar" className="rounded-full mt-2 ml-1" />
              </div>
              <h2 className="text-lg font-semibold">Chat Room {selectedRoom?.chatRoomId}</h2>
            </div>


            <div className="flex-grow p-4 overflow-y-auto flex-reverse bg-white mx-2 rounded-lg" id="something" ref={chatBox}>
              {selectedRoom?.messages.map((msg, index) => (
                <>
                  {msg.senderId !== user?.id ? (
                    <div className='flex justify-start'>
                      <div key={index} className="p-4 mb-4 bg-blue-100 rounded-lg self-start max-w-lg ">
                        {msg.content}
                        <div className="text-xs text-gray-500 text-right mt-2">{msg.timestamp}</div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex justify-end'>
                      <div key={index} className="p-4 mb-4 bg-yellow-100 rounded-lg self-start max-w-lg">
                        {msg.content}
                        <div className="text-xs text-gray-500 text-right mt-2">{msg.timestamp}</div>
                      </div>
                    </div>
                  )}
                </>

              ))}

              <div ref={lastMessageRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-slate-200 flex items-center rounded-b-lg">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Write your message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="input input-bordered w-full rounded-full px-4 py-2"
                />
              </div>
              <button className=" mx-4 gap-2 rounded-md" onClick={sendMessage}>
                <Image src="/send.svg" height={42} width={42} alt="Send" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow w-full flex h-full overflow-hidden">
          <div className="text-2xl text-black w-full text-center m-auto">
            There are no chats available!
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(EmployeeChat)
