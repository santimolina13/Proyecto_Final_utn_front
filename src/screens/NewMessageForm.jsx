import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'
import ENVIROMENT from '../utils/config/enviroment'
import useForm from '../hooks/userForm'
import '../styles/newMessageForm.style.css'
import { IoMdMicrophone } from "react-icons/io";
import { GiPaperClip } from "react-icons/gi";

const NewMessageForm = ({chatId}) => {
    
    const {form_state,handleChangeInput}=useForm({content:""})
    
        const handleSubmitForm=async(event)=>{
            try{
            event.preventDefault()
            const response=await fetch(ENVIROMENT.API_URL+"/api/chats/"+chatId+"/sendMessage",{
                method:"POST",
                headers:getAuthenticatedHeaders(),
                body:JSON.stringify(form_state)
            })
            const data=await response.json()
            console.log(data)
            handleChangeInput({target:{name:"content",value:""}})

            }
            catch(error){
                console.error(error)
            }

        }
    
    
        
  return (
    <div className='new-message-form-container'>
        <span className='clip'><GiPaperClip  className='icon' style={{color:"black"}}/></span>
        <form onSubmit={handleSubmitForm} className='new-message-form'>
            <input type="text" name='content' id='content' onChange={handleChangeInput} value={form_state.content} className='new-message-input' />
            <button type='submit' className='new-message-button'>{'>'}</button>
        </form>
        <span  className='microfono'><IoMdMicrophone  title="Mandar mensaje de audio"/></span>
    </div>
  )
}

export default NewMessageForm