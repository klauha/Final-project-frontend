import { useSelector } from 'react-redux'
import { getIssueById } from '../../services/apiCalls'
import './DetailIssue.css'
import React, { useEffect } from 'react'
import { userData } from '../../app/slices/userSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom';


export const DetailIssue = ({id}) => {
    const rdxUser = useSelector(userData)
    const [issueSelected, setIssueSelected] = useState([])
  
    const params = useParams()

useEffect(() => {
    const getIssue = async()=> {
        const response = await getIssueById(rdxUser.token, params.id)
        setIssueSelected(response.data)
    }
    getIssue()
},[])


return (
  <div className="detailIssue">
    <div className="detailIssue-container">
      <div className="detailIssue-title">
        <div className="container-issue"></div>
      <label>Titulo:</label>
        <p>{issueSelected.title}</p>
      </div>
      <div className="detailIssue-description">
      <label>Descripción</label>
        <p>{issueSelected.description}</p>
      </div>
      <div className="detailIssue-department">
      <label>Departamento</label>
        <p>{issueSelected.department?.name}</p>
      </div> 
      <div className="detailIssue-issueType">
      <label>Tipo de incidencia</label>
        <p>{issueSelected.issue_type?.name}</p>
      </div> 
      <div className="detailIssue-status">
      <label>Estado</label>
        <p>{issueSelected.status}</p> 
  </div>
    </div>
  </div>

  )
}