"use client";
import { Navbar } from '@/components/Navbar';
import { useState, useEffect, useRef } from 'react';

type User = {
    id: string;
    name: string;
    avatar: string;
    messages: string[];
};

export default function EmployeeChat() {
    // List of users with chat histories
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'User 283746574831',
            avatar: '/user.svg',
            messages: ["Good afternoon. Last month I bought two May flowers and have been watering them every day. However, they seem to me to be withered. Could you help me?"]
        },
        {
            id: '2',
            name: 'User 738293800283',
            avatar: '/user.svg',
            messages: ["Hello, I'm experiencing some issues with my plants."]
        },
        {
            id: '3',
            name: 'User 123456123248',
            avatar: '/user.svg',
            messages: ["Hey there! Any tips on growing May flowers?"]
        },
        {
            id: '4',
            name: 'User 348570893284',
            avatar: '/user.svg',
            messages: ["What should I do if my flowers wilt too quickly?"]
        },
        {
            id: '5',
            name: 'User 238497218561',
            avatar: '/user.svg',
            messages: ["Can you help with pest control for my greenhouse plants?"]
        },
        {
            id: '6',
            name: 'User 192837481238',
            avatar: '/user.svg',
            messages: ["I have an issue with the watering system in my greenhouse."]
        },
    ]);

    const [selectedUserId, setSelectedUserId] = useState<string>(users[0].id);
    const [newMessage, setNewMessage] = useState<string>("");

    // Create a reference for the last message
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    // Automatically scroll to the last message when the messages change
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedUserId, users]);

    // Function to add a new message for the selected user
    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUserId
                        ? { ...user, messages: [...user.messages, newMessage] }
                        : user
                )
            );
            setNewMessage("");
        }
    };

    // Find the selected user to display their messages
    const selectedUser = users.find(user => user.id === selectedUserId);

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow w-full flex h-full overflow-hidden">
                
                {/* List of clients */}
                <div className="w-1/4 flex flex-col divide-y divide-slate-300 bg-zinc-50 h-full overflow-auto">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className={`w-full flex flex-row p-4 cursor-pointer ${user.id === selectedUserId ? 'bg-gray-200' : ''}`}
                            onClick={() => setSelectedUserId(user.id)}
                        >
                            <img src={user.avatar} className="w-1/8 mr-2" alt="User avatar" />
                            <div className="mt-1">{user.name}</div>
                        </div>
                    ))}
                </div>

                {/* Chat box */}
                <div className="w-3/4 flex flex-col h-full bg-slate-200 rounded-lg shadow-lg">
                    {/* Header with avatar and user name */}
                    <div className="flex items-center p-4 border-b bg-slate-200 rounded-t-lg">
                        <img src={selectedUser?.avatar} className="w-12 h-12 rounded-full mr-4" alt="Avatar" />
                        <h2 className="text-lg font-semibold">{selectedUser?.name}</h2>
                    </div>


                    <div className="flex-grow p-4 overflow-y-auto bg-white mx-2 rounded-lg">
                        {selectedUser?.messages.map((msg, index) => (
                            <div key={index} className="p-4 mb-4 bg-blue-100 rounded-lg self-start max-w-lg">
                                {msg}
                                <div className="text-xs text-gray-500 text-right mt-2">15:34</div>
                            </div>
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
                        <button className="btn btn-ghost ml-4 rounded-full" onClick={sendMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
