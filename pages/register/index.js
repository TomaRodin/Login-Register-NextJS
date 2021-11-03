import React from 'react'
import {useRef, useState, useEffect} from 'react'
import Cookie from 'universal-cookie'
import styles from '../../styles/Styles.module.css'

export default function index() {

    const username = useRef()
    const password = useRef()
    const [ext, setExt] = useState("")
    const cookie = new Cookie();
    const confirmPassword = useRef()
    const [isSame, setIsSame] = useState("")

    const Redirect = () => {
        window.location.href = 'http://localhost:3000/user'
    }

    const handleChange = () => {
        if (password.current.value !== confirmPassword.current.value) {
            setIsSame("Confirm Password and Password are not same")
        }
        else {
            setIsSame("")
        }
    }

    const handleSubmit = () => {
        if (password.current.value ===  confirmPassword.current.value & password.current.value !== null & confirmPassword.current.value !== null) {
            setExt("")
            fetch('http://localhost:3001/register', {
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({username:username.current.value, password:password.current.value}),
                method: 'POST'
            })
            .then(response => {
                if (response) {
                    setExt("Exist")
                }
            })
            
            cookie.set('LoggedIn', username.current.value,{path: "/"})
            location.reload()
        }
        else {
            setExt("Make sure you enter everything correctly")
        }

    }

    useEffect(() => {
        if (cookie.get('LoggedIn') !== undefined) { 
            window.location.href = 'http://localhost:3000/user'  
        }
    },[])

    if (cookie.get('LoggedIn') === undefined) {
        return (
            <div >
                <div  className={styles.container}>
                    <div className={styles.form} > 
                        <h1>Register</h1>
                        <h3>Username:</h3>
                        <input ref={username} type="text"  />
                        <h3>Password:</h3>
                        <input ref={password} type="password" />
                        <br />
                        <h3>Confirm Password</h3>
                        <input ref={confirmPassword} onChange={handleChange} type="password"/>
                        {isSame}
                        <br/>
                        <br />
                        <button onClick={handleSubmit} >Register</button>
                        <br />
                        <br />
                        <a href="/login" >Login</a>
                        {ext}
                    </div>
                </div>
            </div>
        )
    }
    else {
        Redirect()
    }
}
