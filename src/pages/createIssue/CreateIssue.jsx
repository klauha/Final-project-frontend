import React, { useEffect, useState } from 'react'
import "./CreateIssue.css"
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input'

export const CreateIssue = () => {
    const [bodyDataIssue, setBodyDataIssue] = useState(
        {
            title: '',
            issueTypeId: '',
            departamentId: '',
            description: '',
        }
    )
    const [departaments, setDepartaments] = useState([])

    const inputHandler = (e) => {
        setBodyDataIssue((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

        const fetchDepartament = async () => {
            const response = await getDepartament()
            setDepartaments(response.data)
        
        }
        useEffect(() => {
            fetchDepartament()
        }, [])

    return (

        <div className='create-issue-design'>
            {/* <h2>Crear Incidencia</h2> */}
            <div className="container-create-issue">

                
                <div className='container-issue-1 container-issue'>
                <div className="form-group">
                    <label>Tipo de Incidencia</label>
                    <input
                        type="text"
                        className="input-issue-design"
                        name="issueTypeId"
                        onChange={(e) => inputHandler(e)} />
                </div>
                <div className="form-group">
                    <label>Departamento</label>
                    <input
                        type="text"
                        className="input-issue-design"
                        name="departamentId"
                        onChange={(e) => inputHandler(e)} />
                </div>
                </div>
                <div className='container-issue-2 container-issue'>
                <div className="form-group">
                    <label>Titulo</label>
                    <Input

                        type="text"
                        className="input-issue-design"
                        name="title"
                        onChange={(e) => inputHandler(e)} />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                        className="input-issue-design"
                        name="description"
                        onChange={(e) => inputHandler(e)} />
                </div>
                </div>
                <div className='container-issue-3'>

                <Button
                        title={"Crear Incidencia"}
                        className="ButtonDesign"
                        // onClick={LogMe}
                    />

                </div>
            </div>
        </div>
        
    )
}
