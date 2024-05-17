import("./HomeUser.css")
import IconAdd from "../../../public/img/add.png"
import IconIssue from "../../../public/img/issues.png"
import React from 'react'
import { useNavigate } from "react-router-dom"

export const HomeUser = () => {
    const navigate = useNavigate()
    const navigateToNewIssue = () => { navigate("/create-issue") }
    const navigateToMyIssues = () => { navigate("/my-issues") }
    return (
        <div className="home-design">
            <div className="home-container">
                <div className="container1" onClick={navigateToNewIssue}>
                    <h3 className="h3-home"> Nueva incidencia</h3>
                    <img src={IconAdd} className="icon" alt="My Icon" />
                </div>
                <div className="container2" onClick={navigateToMyIssues}>
                    <h3 className="h3-home"> Mis incidencias</h3>
                    <img src={IconIssue} className="icon" alt="My Icon" />
                </div>
            </div>

        </div>
    )
}
