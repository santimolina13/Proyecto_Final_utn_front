import React, { useEffect, useState } from 'react'
import ContactsScreen from './ContactsScreen'
import { ChatScreen } from './ChatScreen'
import '../styles/homeScreen.styles.css'
import { IoMdSettings } from "react-icons/io";

const HomeScreen = () => {
  
  const [contacstComponent,setContactsComponent]=useState(false)
  const [contactSelect,setContactSelect]=useState(null)
 





  return (
    <div className='home-container'>

      <section className='section-container'>
        <nav className='nav-container'>
          <IoMdSettings  className='nav-icon' />
        </nav>
        <aside className='aside-container_contacts'>
          <ContactsScreen onSelectContact={setContactSelect} className='contactos'/>
        </aside>
        <aside className='aside-container_chat'>
          <button onClick={()=>setContactsComponent(!contacstComponent)} className='contact-button-open'>M</button>
          { contacstComponent && <ContactsScreen onSelectContact={setContactSelect} className='contactos '/>}
          {contactSelect?<ChatScreen onSelectContact={contactSelect} className='chat'/>:null}  
        </aside>
      </section>
    </div>
  )
}

export default HomeScreen 
