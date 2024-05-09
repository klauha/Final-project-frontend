import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./CreateIssue.css"
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input'
import { userData } from '../../app/slices/userSlice'
import { createIssue, getDepartament, getIssueType } from '../../services/apiCalls'

export const CreateIssue = () => {

    const rdxUser = useSelector(userData)

    const [bodyDataIssue, setBodyDataIssue] = useState(
        {
            title: '',
            issueTypeId: '',
            departmentId: '',
            description: '',
        }
    )

    const [departments, setDepartments] = useState([])
    const [issueTypes, setIssueTypes] = useState([])

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
        // 
   
    }

    return (
        <div className='create-issue-design'>
            <div className="container-create-issue">
                <div className='container-issue-1 container-issue'>
                    <div className="form-group">
                        <label>Departamento</label>
                        <select name="departmentId" id="" onChange={inputHandler}>
                            {
                                departments.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tipo de Incidencia</label>
                        <select name="issueTypeId" id="" onChange={inputHandler}>
                            {
                                issueTypes.map((issueType) => (
                                    <option key={issueType.id} value={issueType.id}>{issueType.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='container-issue-2 container-issue'>
                    <div className="form-group">
                        <label>Titulo</label>
                        <Input
                            type="text"
                            className="input-issue-design"
                            name="title"
                            onChangeFunction={(e) => inputHandler(e)} />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            className="input-issue-design"
                            name="description"
                            onChange={(e) => inputHandler(e)} />
                    </div>
                </div>
            </div>
            <Button
                title={"Crear Incidencia"}
                className="ButtonDesign"
                onClick={postIssue}
            />
        </div>
    )
}
