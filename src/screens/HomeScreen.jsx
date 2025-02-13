 import React, { useEffect, useState } from 'react'
import ContactsScreen from './ContactsScreen'

import { ChatScreen } from './ChatScreen'
import '../styles/homeScreen.styles.css'

const HomeScreen = () => {
  
  
  const [contactSelect,setContactSelect]=useState(null)
 





  return (
    <div className='home-container'>

      <section className='section-container'>
        <nav className='nav-container'> soy el nav</nav>
        <aside className='aside-container_contacts'>
          <ContactsScreen onSelectContact={setContactSelect} className='contactos'/>
        </aside>
        <aside className='aside-container_chat'>
          {contactSelect?<ChatScreen onSelectContact={contactSelect} className='chat'/>:null}  
        </aside>
      </section>
    </div>
  )
}

export default HomeScreen 
