import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './CreateComment.css'
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import { userData } from '../../app/slices/userSlice'

export const CreateComment = () => {
    const rdxUser = useSelector(userData)
    const [bodyDataComment, setBodyDataComment] = useState(
        {
            comment: '',
            issueId: '',
        }
    )

    const inputHandler = (event) => {
        setBodyDataComment({
            ...bodyDataComment,
            [event.target.name]: event.target.value
        })
    }

    const postComment = () => {
        // Aquí va tu lógica para publicar el comentario
    }

    return (
        <div className="create-comment-design">
            <div className="container-create-comment">
                <div className="container-comment-1 container-comment">
                    <Input
                        name="comment"
                        label="Comentario"
                        type="text"
                        value={bodyDataComment.comment}
                        onChange={inputHandler}
                    />
                </div>
                <div className="container-comment-2 container-comment">
                    <Button
                        title="Crear Comentario"
                        onClick={postComment}
                    />
                </div>
            </div>
        </div>
    )
}