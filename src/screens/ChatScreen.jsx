
import React, { useState, useEffect } from 'react'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'
import ENVIROMENT from '../utils/config/enviroment'
import MessageScreen from './MessageScreen'
import NewMessageForm from './NewMessageForm'
import '../styles/chatScreen.style.css'

export const ChatScreen = ({ onSelectContact }) => {
    const [chatData, setChatData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [senderChat, setSenderChat] = useState("")

    useEffect(() => {
        if (!onSelectContact) return

        const fetchChat = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${ENVIROMENT.API_URL}/api/chats/${onSelectContact}`, {
                    method: "POST",
                    headers: getAuthenticatedHeaders(),
                });
                const data = await response.json()
                setChatData(data);
                
            } catch (err) {
                setError("Error al cargar los mensajes")
            } finally {
                setLoading(false)
            }
        };

        fetchChat()
    }, [onSelectContact]) // <-- Se ejecuta cada vez que cambia onSelectContact

    if (loading) return <p>Cargando mensajes...</p>
    if (error) return <p>{error}</p>
    if (!chatData || !chatData.data) return <p>No hay mensajes disponibles</p>

    
    const chatId = chatData?.data.chat._id
    
    

    return (
        <div className='chat-container'>
            <header className='chat-header'>
                <div className='img-header-chat'>{chatData?.data.chat.members[1].username.charAt(0)}</div> 
                <div className='name-header-chat'>{chatData?.data.chat.members[1].username}</div> 
            </header>
            <MessageScreen chatId={chatId} senderChat={setChatData} />
            <NewMessageForm chatId={chatId}  className='newMessageComponent'/>
        </div>
    )
}

