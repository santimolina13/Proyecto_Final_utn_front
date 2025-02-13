import React, { useState } from 'react'
import useForm from '../hooks/userForm'
import ENVIROMENT from '../utils/config/enviroment'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'
import '../styles/addContact.style.css'

const AddContact = ({ setOpenForm,onContactAdded}) => {
    const { form_state, handleChangeInput } = useForm({ email: "" })
    const [error, setError] = useState(""); 

    const handleAddcontact = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(ENVIROMENT.API_URL + "/api/contacts/invite", {
                method: "POST",
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ email: form_state.email })
            });

            const data = await response.json();  

            if (!response.ok) {
                setError(data.message);  
            } else {
                setError("");  
                setOpenForm(false)
                onContactAdded();
            }

        } catch (error) {
            console.error(error)
            setError("Hubo un error al intentar agregar el contacto.");
        }
    }

    return (
        <div className='add-contact-overlay'>
            <div className='add-contact'>
                <button onClick={() => setOpenForm(false)} className='close-button'>X</button>
                <h1>Agrega un nuevo contacto</h1>
                <form onSubmit={handleAddcontact} className='form-add-contact'>
                    <label htmlFor="email">Ingrese el email del nuevo contacto</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    onChange={handleChangeInput} 
                    value={form_state.email} 
                    />
                    <button type="submit" >Agregar</button>
                </form>
            {error && <div >{error}</div>}  
            </div>
        </div>
    );
};

export default AddContact; 

