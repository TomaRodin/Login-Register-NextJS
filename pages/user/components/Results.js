import React from 'react'

export default function Results(props) {
    if (props.data.length < 1) {
        return (
            <div></div>
        )
    }
    const array = props.data
    array.map(res => {
        return(
            <div>
                <h1>{res.username}</h1>
            </div>
        )
    })

}
