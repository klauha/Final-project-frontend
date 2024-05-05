import React, { useState } from 'react'
import { Input } from '../../common/Input/Input'
import './Register.css'
import { useNavigate } from "react-router-dom";
import { register } from '../../services/apiCalls';
import { Header } from '../../common/Header/Header';
import { Button } from '../../common/Button/Button';

export const Register = () => {
    const [bodyCredentials, setBodyCredentials] = useState(
        {
            email: "",
            name:"",
            password: ""
        }
    )

    const navigate = useNavigate();

    const registerMe = async () => {
        const userRegistered = await register(bodyCredentials)

        if (userRegistered.success) {
            navigate('/login')
        }
    }

   

    const inputHandler = (e) => {       
        setBodyCredentials((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value,
            }
        ))
    }
    return (
        <>
           
            <div className='registerDesign'>
                <div className="formRegister">
                    <h5> Crea tu cuenta </h5>
                    <Input
                        className="inputDesign input-design"
                        type="name"
                        placeHolder="name"
                        name="name"
                        onChangeFunction={(e) => inputHandler(e)}
                    />
                    <Input
                        className="inputDesign input-design"
                        type="name"
                        placeHolder="surname"
                        name="surname"
                        onChangeFunction={(e) => inputHandler(e)}
                    />
                    <Input
                        className="inputDesign input-design"
                        type="email"
                        placeHolder="email"
                        name="email"
                        onChangeFunction={(e) => inputHandler(e)}
                    />
               

                    <Input
                        className="inputDesign"
                        type="password"
                        placeHolder="password"
                        name="password"
                        onChangeFunction={(e) => inputHandler(e)}
                    />

                    <Button
                        title={"Registrar"}
                        className="ButtonDesign"
                        onClick={registerMe}
                    />
                </div>
            </div>
        </>
    )
}
