import { Routes, Route } from "react-router-dom"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { CreateIssue } from "../createIssue/CreateIssue"
import { MyIssues } from "../MyIssues/MyIssues"

export const Body = () => {
    return (
        <Routes>
             <Route path="/login" element={<Login/>} />
             <Route path="/register" element={<Register/>} />
             <Route path="/create-issue" element={<CreateIssue />} />
             <Route path="/my-issues" element={<MyIssues/>} />
        </Routes>
    )
}