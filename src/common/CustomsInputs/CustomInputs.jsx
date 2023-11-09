import React from 'react'
import './CustomInput.css'

export const CustomInput = ({style, type, name, placeholder, functionProp}) => {
     return (
         <input 
            className={style}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={(e)=>functionProp(e)}
         />

     )
}