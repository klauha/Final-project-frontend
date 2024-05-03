import { Routes, Route } from "react-router-dom"
import { Login } from "../Login/Login"

export const Body = () => {
    return (
        <Routes>
             <Route path="/login" element={<Login/>} />
        </Routes>
    )
}