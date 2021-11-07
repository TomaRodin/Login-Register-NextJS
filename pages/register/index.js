import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Cookie from 'universal-cookie'
import styles from '../../styles/Styles.module.css'

export default function index() {

    const username = useRef()
    const password = useRef()
    const [ext, setExt] = useState("")
    const cookie = new Cookie();
    const confirmPassword = useRef()
    const [isSame, setIsSame] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)

    const Redirect = () => {
        Router.push('/user')
    }

    const handleChange = () => {
        if (password.current.value !== confirmPassword.current.value) {
            setIsSame("Confirm Password and Password are not same")
        }
        else {
            setIsSame("")
        }
    }

    const formHandler = () => {
        if (username.current.value !== "" && password.current.value !== "" && confirmPassword.current.value !== "") {
            setIsDisabled(false)
        }
        else {
            setIsDisabled(true)
        }
    }

    const handleSubmit = () => {
        if (password.current.value === confirmPassword.current.value & password.current.value !== null & confirmPassword.current.value !== null) {
            setExt("")
            const authUsername = 'admin'
            const authPassword = 'admin123'
        
            const token = Buffer.from(`${authUsername}:${authPassword}`, 'utf8').toString('base64')
        
            fetch('http://localhost:3001/register', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${token}` },
                body: JSON.stringify({ username: username.current.value, password: password.current.value }),
                method: 'POST'
            })
                .then(response => {
                    if (response) {
                        setExt("Exist")
                        return false
                    }
                    else {
                        cookie.set('LoggedIn', username.current.value, { path: "/" })
                        Router.push('/user')
                    }
                })


        }
        else {
            setExt("Make sure you enter everything correctly")
        }

    }

    useEffect(() => {
        if (cookie.get('LoggedIn') !== undefined) {
            window.location.href = 'http://localhost:3000/user'
        }
    }, [])

    if (cookie.get('LoggedIn') === undefined) {
        return (
            <div >
                <div className={styles.container}>
                    <div className={styles.form} onChange={formHandler} >
                        <h1>Register</h1>
                        <h3>Username:</h3>
                        <input ref={username} type="text" />
                        <h3>Password:</h3>
                        <input ref={password} minlength="8" type="password" />
                        <br />
                        <h3>Confirm Password:</h3>
                        <input ref={confirmPassword} onChange={handleChange} type="password" />
                        <br />
                        <p className={styles.ext} >{isSame}</p>
                        <br />
                        <br />
                        <button onClick={handleSubmit} disabled={isDisabled} >Register</button>
                        <br />
                        <br />
                        <a href="/login" >Login</a>
                        <p className={styles.ext} >{ext}</p>
                    </div>
                </div>
            </div>
        )
    }
    else {
        Redirect()
    }
}
