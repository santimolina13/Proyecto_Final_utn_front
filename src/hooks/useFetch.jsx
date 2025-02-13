import { useEffect, useState } from "react"

 export const  useFetch = (fetch_url,params) =>{
    const [loading ,setIsloading]=useState(true)
    const [data,setData]= useState(null)
    const [error,setError]=useState(null)


    const callFech= async()=>{

        const response=await fetch(fetch_url,params) 
        const responseData=await response.json()
        setData(responseData)
        setIsloading(false)
        }
    try{
       useEffect(()=>{callFech()},[]) 
    }
    catch(error){
        setError(error)

    }
    return {loading,data,error}
}