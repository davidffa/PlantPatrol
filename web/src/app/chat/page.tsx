"use client"
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client'; // Correct SockJS import
import Stomp from 'stompjs'; // Correct Stomp import

type Message = {
  text: string;
};

const Page: React.FC = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [privateStompClient, setPrivateStompClient] = useState<Stomp.Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Setting up the public STOMP client
    const publicSocket = new SockJS('http://localhost:8080/ws');
    const publicClient = Stomp.over(publicSocket);

    publicClient.connect({}, (frame) => {
      console.log('Connected to public STOMP:', frame);
      publicClient.subscribe('app/v1/employees', (message) => {
        if (message.body) {
          const parsedMessage = JSON.parse(message.body);
          addMessage(parsedMessage);
        }
      });
    });

    setStompClient(publicClient);

    // Setting up the private STOMP client
    const privateSocket = new SockJS('/ws');
    const privateClient = Stomp.over(privateSocket);

    privateClient.connect({}, (frame) => {
      console.log('Connected to private STOMP:', frame);
      privateClient.subscribe('/user/specific', (message) => {
        if (message.body) {
          const parsedMessage = JSON.parse(message.body);
          addMessage(parsedMessage);
        }
      });
    });

    setPrivateStompClient(privateClient);

  }, []);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = () => {
    const text = (document.getElementById('text') as HTMLInputElement)?.value;
    if (stompClient && text) {
      stompClient.send(
        '/app/v1/clients',
        {},
        JSON.stringify({ text })
      );
    }
  };

  const sendPrivateMessage = () => {
    const text = (document.getElementById('privateText') as HTMLInputElement)?.value;
    const to = (document.getElementById('to') as HTMLInputElement)?.value;
    if (privateStompClient && text && to) {
      privateStompClient.send(
        '/app/private',
        {},
        JSON.stringify({ text, to })
      );
    }
  };

  return (
    <div>
      <div>
        <button onClick={sendMessage}>Send</button>
        <input type="text" id="text" placeholder="Text" />
      </div>
      <br />
      <div>
        <button onClick={sendPrivateMessage}>Send Private</button>
        <input type="text" id="privateText" placeholder="Private Message" />
        <input type="text" id="to" placeholder="To" />
      </div>
      <br />
      <br />
      <br />
      <div id="messages">
        {messages.map((msg, index) => (
          <p key={index}>Message: {msg.text}</p>
        ))}
      </div>
    </div>
  );
};

export default Page;
