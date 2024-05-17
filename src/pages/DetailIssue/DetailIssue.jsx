import { useSelector } from 'react-redux'
import { createComment, getCommentsByIssue, getIssueById } from '../../services/apiCalls'
import './DetailIssue.css'
import React, { useEffect } from 'react'
import { userData } from '../../app/slices/userSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'



export const DetailIssue = ({ id }) => {
    const params = useParams()
    const rdxUser = useSelector(userData)
    const [issueSelected, setIssueSelected] = useState([])
    const [comments, setComments] = useState([{}])
    const [bodyDataComment, setBodyDataComment] = useState(
        {  issueId: params.id,
            comment: '',
        },
    )     

    useEffect(() => {
        const getIssue = async () => {
            const response = await getIssueById(rdxUser.token, params.id)
            setIssueSelected(response.data)
        }
        getIssue()
    }, [])

    useEffect(() => {
        const getComments = async () => {
            const response = await getCommentsByIssue(rdxUser.token, params.id)
            setComments(response.data.comments)
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

        const response = await createComment(rdxUser.token, bodyDataComment)
        setComments([...comments, response.data])
        setBodyDataComment(prevState => ({ ...prevState, comment: '' }))
    }

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
                        <p className='styled-p' style={{ backgroundColor: issueSelected.status === 'CERRADA' ? 'red' : issueSelected.status === 'EN TRÁMITE' ? 'yellow' : 'green' }}>{issueSelected.status}</p>
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
            <div className="newComment-container">
                <textarea
                    className="textAreaDesign"
                    name="comment"
                    value={bodyDataComment.comment}
                    onChange={inputHandler}
                />
                <Button
                    title={"Nuevo Comentario"}
                    className="ButtonDesign"
                    onClick={postComment}
                />
            </div>
            {/* <h3>Historial</h3> */}
            <div className="comments-container">

                <div className="comments">
                    <div className="comment-header">
                        <div className="comment-user">
                            <label>Usuario</label>
                        </div>
                        <div className="comment-date">
                            <label>Fecha</label>
                        </div>
                        <div className="comment-time">
                            <label>Hora</label>
                        </div>
                        <div className="comment-content">
                            <label>Comentario</label>
                        </div>
                    </div>
                    {comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((comment, index) => (
                            <div className="comment" key={index}>
                                {/* <div className="comment-user">
                                <p className='styled-p'>{comment.user ? comment.user.name : 'Unknown'}</p>
                                </div> */}
                                <div className="comment-date">
                                    <p className='styled-p'>{new Date(comment.created_at).toLocaleDateString('es-ES')}</p>
                                </div>
                                <div className="comment-time">
                                    <p className='styled-p'>{new Date(comment.created_at).toLocaleTimeString('es-ES')}</p>
                                </div>
                                <div className="comment-description">
                                    <p className='styled-p comment-text'>{comment.content}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}