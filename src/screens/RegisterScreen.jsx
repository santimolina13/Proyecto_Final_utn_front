import React from 'react'
import useForm from '../hooks/userForm'
import ENVIROMENT from '../utils/config/enviroment'
import { errors } from '../componentes/errorInput'
import '../styles/loginScreen.styles.css'

const RegisterScreen = () => {
const {form_state, handleChangeInput} = useForm({username: "", email: "", password: ""})

 const handleSubmitForm=async(event)=>{
    try{
        event.preventDefault()
        const response=await fetch(ENVIROMENT.API_URL+"/api/auth/register",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body: JSON.stringify(form_state)
        })
        const data=await response.json()
        console.log(data)


    }
    catch(error){
        console.error(error)
    }
 }
const validationErrors = errors(form_state); // Renombrar aquí la constante local





  return (
    <div className='FormPage'>
        <div className='conteinerForm'>
            <h1>Registro</h1>
            <form onSubmit={handleSubmitForm} >
                <div>
                    <label htmlFor="username">Ingrese su Nombre</label>
                    <input type="text" name='username' id='username' placeholder='joedoe' value={form_state.username} onChange={handleChangeInput} />
                    {validationErrors.username.map((error, index) => (<p key={index} className='error_input'>{error}</p> ))}
                </div>
                <div>
                    <label htmlFor="email">Ingrese su email</label>
                    <input type="text" name='email' id='email' placeholder='joedoe@email.com'value={form_state.email} onChange={handleChangeInput}/>
                    {validationErrors.email.map((error, index) => (<p key={index} className='error_input'>{error}</p> ))}
                </div>
                <div>
                    <label htmlFor="">Ingrese una contraseña</label>
                    <input type="text" name='password' id='password' placeholder='********' value={form_state.password} onChange={handleChangeInput}/>
                    {validationErrors.password.map((error, index) => (<p key={index} className='error_input' >{error}</p> ))}
                </div>
                <button type='submit'
                    disabled={validationErrors.email.length
                    || validationErrors.password.length
                    || validationErrors.username.length
                    || !form_state.username
                    || !form_state.email 
                    || !form_state.password }>Registrar</button>
            </form>
        </div>
    </div>
  )
}

export default RegisterScreen