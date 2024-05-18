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
                <div className="">
                        <label>Fecha</label>
                    {/* <div className="dateIssue container-fields"> */}
                        <p className='styled-p'> {new Date(issueSelected.created_at).toLocaleDateString('es-ES')}</p>
                    {/* </div> */}
                        <label>Usuario</label>
                    {/* <div className="detailIssue-user container-fields"> */}
                        <p className='styled-p'>{issueSelected.user?.name}</p>
                    {/* </div> */}
                        <label>Estado</label>
                    {/* <div className="detailIssue-status container-fields"> */}
                        <p className='styled-p' style={{ backgroundColor: issueSelected.status === 'CERRADA' ? 'red' : issueSelected.status === 'EN TRÁMITE' ? 'yellow' : 'green' }}>{issueSelected.status}</p>
                    {/* </div> */}
                </div>
                <div className="">
                        <label>Departamento</label>
                    {/* <div className="detailIssue-department container-fields"> */}
                        <p className='styled-p'>{issueSelected.department?.name}</p>
                    {/* </div> */}

                        <label>Tipo de incidencia</label>
                    {/* <div className="detailIssue-issueType container-fields"> */}
                        <p className='styled-p'>{issueSelected.issue_type?.name}</p>
                    {/* </div> */}
                </div>
                {/* <div className="container3"> */}
                        <label>Titulo</label>
                    {/* <div className="detailIssue-title container-fields"> */}
                        <p className='styled-p'>{issueSelected.title}</p>
                    {/* </div> */}
                        <label>Descripción</label>
                    {/* <div className="detailIssue-description container-fields"> */}
                        <p className='styled-p'>{issueSelected.description}</p>
                    {/* </div> */}
                {/* </div> */}
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
            {/* <h3>Historial</h3> */}
            <div className="comments-container">

                <div className="comments">
                    {comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((comment, index) => (
                            // <div className="comments-container">
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
                        // </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}