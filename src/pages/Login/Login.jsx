
import React, { useState } from 'react'
import { Input } from '../../common/Input/Input'
import "./Login.css"
import { login } from '../../services/apiCalls'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import { Button } from '../../common/Button/Button'

import { useDispatch } from "react-redux";
import { loginRdx } from "../../app/slices/userSlice";


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bodyCredentials, setBodyCredentials] = useState(
        {
            email: "",
            password: ""
        }
    )
    const [bodyCredentialsError, setBodyCredentialsError] = useState(
        {
            email: "",
            password: ""
        }
    )

    const LogMe = async () => {
        setBodyCredentialsError({ ...bodyCredentialsError, email: "" })
        setBodyCredentialsError({ ...bodyCredentialsError, password: "" })

        if (!bodyCredentials.email) {
            setBodyCredentialsError({ ...bodyCredentialsError, email: "Introduce un email" })

            return
        }

        if (bodyCredentials.password === "") {

            setBodyCredentialsError({ ...bodyCredentialsError, password: "Introduce el password" })
            return
        }
        const responseApiLogin = await login(bodyCredentials)
        const decoded = decodeToken(responseApiLogin.token)

        console.log(decoded);
        // Si el inicio de sesión es exitoso y el usuario tiene rol user
        if (responseApiLogin.success && decoded.roleName === "user") {
            dispatch(loginRdx(
                {
                    token: responseApiLogin.token,
                    userId: decoded.userId,
                    role: decoded.roleName
                }
            ))

            navigate("/home")
        } else {
            // Si el inicio de sesión es exitoso y el usuario es admin o superadmin
            dispatch(loginRdx(
                {
                    token: responseApiLogin.token,
                    userId: decoded.userId,
                    role: decoded.roleName
                }
            ))

            navigate("/home")
        }
    }

    const inputHandler = (e) => {
        setBodyCredentials((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))

    }
    return (
        <>
            <div className='loginDesign'>
                <div className="formLogin">
                    <h5> Accede a tu cuenta</h5>
                    <Input
                        className="inputDesign"
                        type="email"
                        placeHolder="email"
                        name="email"
                        onChangeFunction={(e) => inputHandler(e)}
                    />
                    {
                        bodyCredentialsError.email === "Introduce un email"
                            ? <div> {bodyCredentialsError.email} </div>
                            : <div></div>
                    }
                    <Input
                        className="inputDesign"
                        type="password"
                        placeHolder="password"
                        name="password"
                        onChangeFunction={(e) => inputHandler(e)}
                    />
                    {
                        bodyCredentialsError.password === "Introduce el password"
                            ? <div> {bodyCredentialsError.password} </div>
                            : <div></div>
                    }

                    <Button
                        title={"Entrar"}
                        className="ButtonDesign"
                        onClick={LogMe}
                    />

                </div>
            </div>
        </>
    )
}
