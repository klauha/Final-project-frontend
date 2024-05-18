import { useSelector } from 'react-redux'
import { createComment, createCommentAsAdmin, getCommentsByIssue, getIssueById, getIssueByIdForAdmin, updateIssueStatus } from '../../services/apiCalls'
import './DetailIssueSuperAdmin.css'
import React, { useEffect } from 'react'
import { userData } from '../../app/slices/userSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'



export const DetailIssueSuperAdmin = ({ id }) => {
    const params = useParams()

    const rdxUser = useSelector(userData)
    const [issueSelected, setIssueSelected] = useState({})
    const [comments, setComments] = useState([{}])
    const [bodyDataComment, setBodyDataComment] = useState(
        {
            issueId: params.id,
            comment: '',
        },
    )

    useEffect(() => {
        const getIssue = async () => {
            const response = await getIssueByIdForAdmin(rdxUser.token, params.id)
            console.log(response.data);
            setIssueSelected(response.data)
        }

        getIssue()
    }, [])

    useEffect(() => {
        const getComments = async () => {
            const response = await getCommentsByIssue(rdxUser.token, params.id)
            setComments(response.data?.comments)
        }
        getComments()
    }, [])

    const inputHandler = (e) => {
        setBodyDataComment((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const postComment = async () => {
        const response = await createCommentAsAdmin(rdxUser.token, bodyDataComment)
        setComments([...comments, response.data])
        setBodyDataComment(prevState => ({ ...prevState, comment: '' }))
    }
    const updateIssueStatusHandler = async (issueId, issueStatus) => {
        try {   
            const response = await updateIssueStatus(rdxUser.token, issueId, issueStatus)

            if(issueStatus === 'CERRADA') {
                setIssueSelected({
                    ...issueSelected,
                    status: 'CERRADA'
                })
            }

            if(issueStatus === 'ABIERTA') {
                setIssueSelected({
                    ...issueSelected,
                    status: 'ABIERTA'
                })
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="detailIssue">
             <div className="button-my-issues">
          
                    <Button
                        title={issueSelected.status === "ABIERTA" ? " Cerrar incidencia": "Abrir incidencia"}
                        className="ButtonDesign"
                        onClick={issueSelected.status === "ABIERTA" ? () => updateIssueStatusHandler(issueSelected.id, 'CERRADA') :() => updateIssueStatusHandler(issueSelected.id, 'ABIERTA')}

                    />
             
                </div>
            <div className="detailIssue-container">
           

                <div className="container-data">
                    <div className="container-data1">
                            <label className="left-align">Usuario</label>
                        {/* <div > */}
                            <p className='styled-p'>{issueSelected.user?.name}</p>
                        {/* </div> */}
                            <label>Departamento</label>
                        {/* <div > */}
                            <p className='styled-p'>{issueSelected.department?.name}</p>
                        {/* </div> */}
                            <label>Titulo</label>
                        {/* <div > */}
                            <p className='styled-p'>{issueSelected.title}</p>
                        {/* </div> */}

                    {/* </div>
                    <div className="container-data2"> */}
                            <label>Estado</label>
                        {/* <div > */}
                            <p className='styled-p' style={{ backgroundColor: issueSelected.status === 'CERRADA' ? 'red' : issueSelected.status === 'EN TRÁMITE' ? 'yellow' : 'green', color: 'white' }}>{issueSelected.status}</p>
                        {/* </div> */}
                            <label>Tipo de incidencia</label>
                        {/* <div> */}
                            <p className='styled-p'>{issueSelected.issue_type?.name}</p>
                        {/* </div> */}
                            <label>Descripción</label>
                        {/* <div > */}
                            <p className='styled-p'>{issueSelected.description}</p>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <div className="newComment-container">
                <textarea
                    className="textAreaDesign"
                    name="comment"
                    value={bodyDataComment.comment}
                    onChange={inputHandler}
                />
            </div>
            <Button
                    title={"Añadir Comentario"}
                    className="ButtonDesign"
                    onClick={postComment}
                />
            <div className="comments-container">
                <div className="comments">
                    {comments.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at))
                        .map((comment, index) => (
                            comment &&
                            <div className="comment-user" key={index}>
                                <p className="align-right">{new Date(comment.created_at).toLocaleDateString('es-ES')}
                                    {" - " + new Date(comment.created_at).toLocaleTimeString('es-ES')}</p>
                                <p><label>Usuario: </label>{comment.user?.name}</p>
                                <p><label>Comentario: </label>{comment.content}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}