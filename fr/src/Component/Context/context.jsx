
import { createContext,  useEffect,  useState } from "react";
import Cookies from "js-cookie"
import axios from "axios"
export let Context=createContext({
authorized:false,
setAuthorized:()=>{},
user:{},
setUser:()=>{},
refresh:false,
setRefresh:()=>{}
})


let ContextProvider=({children})=>{
let [authorized,setAuthorized]=useState()
let [user,setUser]=useState(false)
let [refresh,setRefresh]=useState(false)
let [showProfile,setShowProfile]=useState(false)


useEffect(()=>{
    const token=Cookies.get("token")
    
    if(token){
    console.log("token",token);
    const config = {
     headers: {
         // 'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
         'token': token
     }
 };
<<<<<<< HEAD
 axios.get("http://localhost:4000/api/v1/user/getUser", config).then((res)=>{
=======
 axios.get("https://job-seeking-website-mb83.onrender.com/api/v1/user/getUser", config).then((res)=>{
>>>>>>> 50f4bc7 (Fix backend url)
   console.log(res.data.user,"ye lo user")
   setAuthorized(true)
   setUser(res.data.user)
 })
    }else{
     console.log("token nahi hai")
    }
 
},[])

return(
    <Context.Provider value={{authorized,setAuthorized,user,setUser,refresh,setRefresh,showProfile,setShowProfile}}>
{children}
    </Context.Provider>
)

}

export default ContextProvider;