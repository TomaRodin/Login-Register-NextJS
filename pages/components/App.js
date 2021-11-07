import React from 'react'
import {useState, useEffect} from 'react'
import Cookie from 'universal-cookie'

export default function App() {
    const [isLoading, setisLoading] = useState(true)

    const cookie = new Cookie();
    const getCookie = cookie.get('LoggedIn')
    console.log(getCookie)

    useEffect(() =>{

        if (getCookie === true) {
          window.location.href = 'http://localhost:3000/user'
        }
        else {
          window.location.href = 'http://localhost:3000/login'
        }
      
    },[]); 
  
    if(isLoading) {
      return(
        <h1>Loading...</h1>
      )
    }
}
