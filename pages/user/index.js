import React from 'react'
import Cookie from 'universal-cookie'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import styles from '../../styles/Styles.module.css'
import Router from 'next/router'

export default function index() {

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const cookie = new Cookie();
    const inputValue = useRef();
    const [SearchData, setSearchData] = useState([]);

    function LogOut() {
        const cookie = new Cookie();
        cookie.remove("LoggedIn")
        location.reload();
    }

    const handleSerach = () => {
        axios.get('http://localhost:3001/search', {
            params: { username: inputValue.current.value}
        }).then(response => {
            console.log(response.data)
            setSearchData(response.data)
        })
    }

    useEffect(() => {
        if (cookie.get('LoggedIn') === undefined) {
            Router.push('/login')
        }
        else {
            axios.get('http://localhost:3001/data', {
                params: { username: cookie.get('LoggedIn') }
            }).then(response => {
                setData(response.data)
                setIsLoading(false)
            })
        }



    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{data.username}</h1>
            <h3>ID: {data.id}</h3>
            <button onClick={LogOut} >Log Out</button>
            <br /><br /><br />
            <input ref={inputValue} />
            <button onClick={handleSerach}>Search</button>
            <hr></hr>
            {SearchData.map(data => {
                return (
                    <div className={styles.usersContainer} >
                        <h3>{data.username}</h3>
                    </div>
                )
            })}

        </div>
    )
}
