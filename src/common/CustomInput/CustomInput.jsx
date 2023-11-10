import React from 'react'
import './CustomInput.css'

export const CustomInput = ({inputStyle, type, name, placeholder, functionProp}) => {
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