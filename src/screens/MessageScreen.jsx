import React from 'react'
import { useFetch } from '../hooks/useFetch'
import ENVIROMENT from '../utils/config/enviroment';
import { getAuthenticatedHeaders } from '../fetching/customHeaders';
import '../styles/messageScreen.style.css'


const MessageScreen = ({chatId,senderChat}) => {
  const  { loading: chat_loading, data: chat_response, error: chat_error }=useFetch(ENVIROMENT.API_URL + "/api/chats/"+chatId, {
        method: "GET",
        headers: getAuthenticatedHeaders(),
    })

    if (chat_loading) return <p>Cargando mensajes...</p>;
  if (chat_error) return <p>Error al cargar los mensajes</p>;
  if (!chat_response || !chat_response.data) return <p>No hay mensajes disponibles</p>;
    console.log("chat_response",chat_response)
    
  return (
      <ul className='message-container'>
        {chat_response.data.allMessageChat.map(message => (
          <li key={message._id} className='message-li'>{message.content}
          <span className='message-username'>{message.sender.username}</span></li>
        ))}
      </ul>
  )
}

export default MessageScreen  
