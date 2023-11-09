
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

export const Header = () => {


     return (
         <div className='headerStyle'>
            <LinkButton
                path={"/"}
                title={"Home"}
            />
            <LinkButton
                path={"/login"}
                title={"Login"}
            />
            <LinkButton
                path={"/register"}
                title={"Register"}
            />
            <LinkButton
                path={"/artists"}
                title={"artists"}
            />
            <LinkButton
                path={"/services"}
                title={"Services"}
            />
         </div>
     )
}