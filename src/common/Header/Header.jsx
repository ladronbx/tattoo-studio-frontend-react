
import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
export const Header = () => {

    return (
        <div className='header-style'>
            <LinkButton
                classButton={"link-button-style"}
                path={"/"}
                title={"Home"}
            />
            <LinkButton
                classButton={"link-button-style"}
                path={"/login"}
                title={"Login"}
            />
            <LinkButton
                classButton={"link-button-style"}
                path={"/register"}
                title={"Register"}
            />
            <LinkButton
                classButton={"link-button-style"}
                path={"/profile"}
                title={"Profile"}
            />
            <LinkButton
                classButton={"link-button-style"}
                path={"/artists"}
                title={"artists"}
            />
            <LinkButton
                classButton={"link-button-style"}
                path={"/services"}
                title={"Services"}
            />
            <LinkButton
                classButton={"link-button-style"}
                path={"/update"}
                title={"UpdateProfile"}
            />
        </div>
    )
}