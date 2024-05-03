import "./Button.css"

import React from 'react'

export const Button = ({ className, title, onClick }) => {
    return (

        <div className={className} onClick={onClick}>
            {title}
        </div>
    )
}
