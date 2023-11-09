import React from 'react'
import './CustomInputs.css'

export const CustomInputs = ({inputStyle, type, name, placeholder, functionProp}) => {
     return (
         <input 
            className={inputStyle}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={(e)=>functionProp(e)}
         />
     )
}