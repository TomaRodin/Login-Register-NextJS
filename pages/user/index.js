import React from 'react'
import Cookie from 'universal-cookie'
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function index() {

    const [data,setData] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const cookie = new Cookie();

    function LogOut() {
        const cookie = new Cookie();
        cookie.remove("LoggedIn")
        location.reload();
    }

    useEffect(() => {
        if (cookie.get('LoggedIn') === undefined) {
            window.location.href = 'http://localhost:3000/login'
        }
        else {
            axios.get('http://localhost:3001/data',{
                params: {username:cookie.get('LoggedIn')}
            }).then(response => {
                setData(response.data)
                setIsLoading(false)
             })
            }
            
        
    
    },[])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{data.username}</h1>
            <h3>ID: {data.id}</h3>
            <button onClick={LogOut} >Log Out</button>
        </div>
    )
}
