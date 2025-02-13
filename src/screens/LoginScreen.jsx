import React from 'react'
import useForm from '../hooks/userForm'
import ENVIROMENT from '../utils/config/enviroment'
import { Link,  useNavigate } from 'react-router-dom'
import {  errors } from '../componentes/errorInput'
import '../styles/loginScreen.styles.css'

const LoginScreen = () => {


const {form_state,handleChangeInput}=useForm({email:"",password:""})

//aca capturo el query string del correo verificado (verify=true) deberia estar en un componente aparte que se despliega dada una condicion
const url=new URLSearchParams(window.location.search)

if(url.get("verified")){
    alert("Correo verificado exitosamente")}//esto me tae el true

    const navigate=useNavigate()
const handleSubmitForm=async(event)=>{


    try{
        event.preventDefault()
        const response=await fetch(ENVIROMENT.API_URL+"/api/auth/login",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body: JSON.stringify(form_state)
        })
        const data=await response.json()
        console.log(data)
        if (data.data && data.data.acces_token) { // Verifica que data contiene el token
            sessionStorage.setItem("acces_token", data.data.acces_token);
            sessionStorage.setItem("name", data.data.user_info.name);
            console.log("Redirigiendo a home");
            navigate("/home");
        } else {
            console.error("Error en la autenticación:", data);
        }
        
    }
    catch(error){
        console.error(error)
    }
    
}
const validationErrors = errors(form_state); // Renombrar aquí la constante local

  return (
    <div className='FormPage'>
        <div className='conteinerForm'>
        <h1>Login</h1>
        <form onSubmit={handleSubmitForm}>
            <div>
                <label htmlFor="">Ingrese su email</label>
                <input name='email' id='email' placeholder='joedoe@email.com' type="text" onChange={handleChangeInput} value={form_state.email} />
                {validationErrors.email.map((error,index)=><p key={index} className='error_input'>{error}</p>)}
                </div>
            <div>
                <label htmlFor="">Ingrese su contraseña</label>
                <input name='password'id='password' type="text" value={form_state.password} onChange={handleChangeInput}/>
                {validationErrors.password.map((error,index)=><p key={index} className='error_input'>{error}</p>)}
            </div>
            <button type='submit'disabled={validationErrors.email.length || validationErrors.password.length || !form_state.email || !form_state.password} >Iniciar sesion</button>
            <span className='spanForm'>Aun no tiene una cuenta? <Link to={"/register"}>Registrate aquí</Link></span>
        </form>
        </div>
    </div>
  )
}

export default LoginScreen