import { Routes, Route } from "react-router-dom"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { CreateIssue } from "../createIssue/CreateIssue"
import { MyIssues } from "../MyIssues/MyIssues"
import { DetailIssue } from "../DetailIssue/DetailIssue"
import { Profile } from "../Profile/Profile"
import { HomeSuperAdmin } from "../HomeSuperAdmin/HomeSuperAdmin"
import { UsersSuperAdmin } from "../UsersSuperAdmin/UsersSuperAdmin"
import { HomeUser } from "../HomeUser/HomeUser"
import { DetailUser } from "../DetailUser/DetailUser"
import { DetailIssueSuperAdmin } from "../DetailIssueSuperAdmin/DetailIssueSuperAdmin"


export const Body = () => {
    return (
        <Routes>
             <Route path="/login" element={<Login/>} />
             <Route path="/register" element={<Register/>} />
             <Route path="/" element={<HomeUser/>} />
             <Route path="/create-issue" element={<CreateIssue />} />
             <Route path="/my-issues" element={<MyIssues/>} />
             <Route path="/issue/:id" element={<DetailIssue/>} />
             <Route path="/profile" element={<Profile/>} />
             <Route path="/admin" element={<HomeSuperAdmin/>} />
             <Route path="/admin/users" element={<UsersSuperAdmin/>} />
             <Route path="admin/users/:id" element={<DetailUser/>} />
             <Route path="admin/issue/:id" element={<DetailIssueSuperAdmin/>} />
        </Routes>
    )
}