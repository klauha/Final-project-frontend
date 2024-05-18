import("./HomeSuperAdmin.css")
import IconUser from "../../../public/img/users.png"
import IconIssue from "../../../public/img/issues.png"
import React from 'react'
import { useNavigate } from "react-router-dom"

export const HomeSuperAdmin = () => {
    const navigate = useNavigate()
    const navigateToUsers = () => { navigate("/admin/users") }
    const navigateToIssues = () => { navigate("/admin/issues") }

    return (
        <div className="home-design">
            <div className="home-container">
                <div className="container1" onClick={navigateToUsers}>
                    <h3 className="h3-home">Gestión de usuarios</h3>
                    <img src={IconUser} className="icon" alt="My Icon" />
                </div>
                <div className="container2" onClick={navigateToIssues}>
                    <h3 className="h3-home">Gestión de incidencias</h3>
                    <img src={IconIssue} className="icon" alt="My Icon" />
                </div>
            </div>

        </div>
    )
}
