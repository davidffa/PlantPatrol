"use client"
import React, { useEffect, useState } from 'react';
import { api } from "@/services/api";

type Message = {
  destinationId: string;
  originId:string,
  content:string,
  timestamp:Date
};

const Page: React.FC = () => {
  useEffect(() => {
    const url = 'ws://127.0.0.1:8080/chat'
    const ws = new WebSocket(url,{
    headers:{
        chatRoomId:"1"
      }
    })

    ws.on("message", console.log)

  }, []);

  async function handleSendMessage() {
    //await api.post("/chat/")
  }
  
  return(
  <div>
      <button onClick={handleSendMessage}>Clique</button>
    </div>
  )
};

export default Page;
