
import React, { useEffect, useState } from 'react'
import ENVIROMENT from '../utils/config/enviroment'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'
import { BiSearchAlt } from "react-icons/bi";
import AddContact from '../componentes/AddContact'
import '../styles/contactScreen.styles.css'

const ContactsScreen = ({ onSelectContact }) => {
    const [openForm, setOpenForm] = useState(false)
    const [dataContacts, setDataContacts] = useState([]) 
    const [loading, setLoading] = useState(true)

    const fetchContactList = async () => {
        setLoading(true)
        try {
            const response = await fetch(ENVIROMENT.API_URL + "/api/contacts", {
                method: "GET",
                headers: getAuthenticatedHeaders()
            });
            const responseData = await response.json()
            console.log("Respuesta del servidor:", responseData)

            if (responseData.data && Array.isArray(responseData.data.listaContactos)) {
                setDataContacts(responseData.data.listaContactos)
            } else {
                console.error("Formato de datos inesperado:", responseData)
                setDataContacts([])
            }
        } catch (error) {
            console.error("Error al obtener contactos:", error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchContactList()
    }, [])

    const handleClickOpenForm = () => {
        setOpenForm(!openForm)
    }

 return (
<aside className='aside-container_contactsScreen'>
    <h2 className='h2-tus-contactos'>Contactos</h2>
        <div className='div-search'>
            <div>
                    <span className='span-search'><BiSearchAlt  style={{color:"black"}}/></span>
                    <input type="search" name="search" id="search" className='input-search' />
                </div>
            </div>

            
            {console.log("Estado actual de dataContacts:", dataContacts)}

            <ul className='ul-contactos'>
                {loading ? (
                    <h2>Cargando...</h2>
                ) : dataContacts.length > 0 ? (
                    dataContacts.map(contact => (
                        <li key={contact._id} className='li-contactos'>
                            <button onClick={() => onSelectContact(contact._id)} className='button-select-contact'>
                                <span className='li-btn-span-avatar'>
                                    {contact.avatar ? contact.avatar : contact.username.charAt(0)}
                                </span>
                                <span className='li-btn-span-username'>{contact.username}</span>
                            </button>
                        </li>
                    ))
                ) : (
                    <h2>No tienes contactos aún.</h2>
                )}
            </ul>

            
            {openForm && (
                <AddContact 
                    setOpenForm={setOpenForm} 
                    onContactAdded={fetchContactList} 
                />
            )}
            <div className='div-add-contact'>
                <button type="button" onClick={handleClickOpenForm} className='button-add-contact'>
                    Agregar contacto
                </button>
            </div>
        </aside>
    )
}

export default ContactsScreen