import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./CreateIssue.css"
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input'
import { userData } from '../../app/slices/userSlice'
import { createIssue, getDepartament, getIssueType } from '../../services/apiCalls'
import { useNavigate } from 'react-router-dom'

export const CreateIssue = () => {
    const rdxUser = useSelector(userData)
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([])
    const [issueTypes, setIssueTypes] = useState([])
    const [bodyDataIssue, setBodyDataIssue] = useState(
        {
            title: '',
            issueTypeId: '',
            departmentId: '',
            description: '',
        }
    )

    useEffect(() => {
        const fetchDepartament = async () => {
            const response = await getDepartament(rdxUser.token)
            setDepartments(response.data)
        }
        fetchDepartament()
    }, [])

    useEffect(() => {
        const fetchIssueTypes = async () => {
            const response = await getIssueType(rdxUser.token)
            console.log(response.data)
            setIssueTypes(response.data)
        }
        fetchIssueTypes()
    }, [])

    const inputHandler = (e) => {
        setBodyDataIssue((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const postIssue = async () => {
        const response = await createIssue(rdxUser.token, bodyDataIssue)
        navigate('/my-issues');
    }

    const navigateToMyIssues = () => {
        console.log(111111);
        navigate("/my-issues")
    }
    return (
        <>
            <div className='create-issue-design'>
                <div className="button-container">
                    <Button
                        title={"Mis incidencias"}
                        className="ButtonDesign"
                        onClick={navigateToMyIssues}
                    />
                </div>

                <div className="container-create-issue">

                    <label>Departamento</label>
                    <select name="departmentId"  className= "select-style" id="" onChange={inputHandler}>
                        {
                            departments.map((department) => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))
                        }
                    </select>

                    <label>Tipo de Incidencia</label>
                    <select name="issueTypeId" className= "select-style" id="" onChange={inputHandler}>
                        {
                            issueTypes.map((issueType) => (
                                <option key={issueType.id} value={issueType.id}>{issueType.name}</option>
                            ))
                        }
                    </select>

                    <label>Titulo</label>
                    <Input
                        type="text"
                        className="input-issue-design"
                        name="title"
                        onChangeFunction={(e) => inputHandler(e)} />

                    <label>Descripción</label>
                    <textarea
                        className="input-issue-design"
                        name="description"
                        onChange={(e) => inputHandler(e)} />

                    <Button
                        title={"Crear Incidencia"}
                        className="ButtonDesign"
                        onClick={postIssue}
                    />
                </div>
            </div>

        </>
    )

}
