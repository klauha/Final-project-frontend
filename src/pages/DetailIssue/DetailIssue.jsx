import { useSelector } from 'react-redux'
import { getIssueById } from '../../services/apiCalls'
import './DetailIssue.css'
import React, { useEffect } from 'react'
import { userData } from '../../app/slices/userSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Input } from '../../common/Input/Input'


export const DetailIssue = ({ id }) => {
    const rdxUser = useSelector(userData)
    const [issueSelected, setIssueSelected] = useState([])

    const params = useParams()

    useEffect(() => {
        const getIssue = async () => {
            const response = await getIssueById(rdxUser.token, params.id)
            setIssueSelected(response.data)
        }
        getIssue()
    }, [])


    return (
        <div className="detailIssue">

            <div className="detailIssue-container">
                <div className="container1">
                <div className="dateIssue container-fields">
                    <label>Fecha</label>
                    <p className='styled-p'> {new Date(issueSelected.created_at).toLocaleDateString('es-ES')}</p>
                </div>
                <div className="detailIssue-user container-fields">
                    <label>Usuario</label>
                    <p className='styled-p'>{issueSelected.user?.name}</p>
                </div>
                <div className="detailIssue-status container-fields">
                    <label>Estado</label>
                    <p className='styled-p' style ={{backgroundColor: issueSelected.status === 'CERRADA'? 'red': 'green'}}>{issueSelected.status}</p>
                </div>
                </div>
                <div className="container2">
                <div className="detailIssue-department container-fields">
                    <label>Departamento</label>
                    <p className='styled-p'>{issueSelected.department?.name}</p>
                </div>
                
                <div className="detailIssue-issueType container-fields">
                    <label>Tipo de incidencia</label>
                    <p className='styled-p'>{issueSelected.issue_type?.name}</p>
                </div>
                </div>
                <div className="container3">
                <div className="detailIssue-title container-fields">
                    <label>Titulo</label>
                    <p className='styled-p'>{issueSelected.title}</p>
                </div>
                <div className="detailIssue-description container-fields">
                    <label>Descripción</label>
                    <p className='styled-p'>{issueSelected.description}</p>
                </div>
                </div>
            </div>
        </div>
    )
}