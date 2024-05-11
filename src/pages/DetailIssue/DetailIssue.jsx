import { useSelector } from 'react-redux'
import { getIssueById } from '../../services/apiCalls'
import './DetailIssue.css'
import React, { useEffect } from 'react'
import { userData } from '../../app/slices/userSlice'
import { useState } from 'react'

export const DetailIssue = ({id}) => {
    const rdxUser = useSelector(userData)
    const [issueSelected, setIssueSelected] = useState([])
  

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
        <h1>{issueSelected.title}</h1>
      </div>
      <div className="detailIssue-description">
        <p>{issueSelected.description}</p>
      </div>
      {/* <div className="detailIssue-department">
        <p>{issueSelected.department.name}</p>
      </div> */}
      {/* <div className="detailIssue-issueType">
        <p>{issueSelected.issue_type.name}</p>
      </div> */}
      {/* <div className="detailIssue-status">
        <p>{issueSelected.status}</p> */}
      {/* </div> */}
    </div>
  </div>

  )
}