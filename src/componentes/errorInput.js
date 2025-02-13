export const errors = (form_state) => {
    const errors={
        email:[],
        password:[],
        username:[]
    }
    
    if(form_state.username){
        form_state.username.length <5 && errors.username.push("El minimo de caracteres es de 5")
    } 

    
    form_state.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form_state.email) && errors.email.push("El formato del email no es válido");
    form_state.password && form_state.password.length >15 && errors.password.push("El limite de caracteres es de 15")
    form_state.password && form_state.password.length <5 && errors.password.push("El minimo de caracteres es de 5")   
    return errors
}