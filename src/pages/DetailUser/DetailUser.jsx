import { useSelector } from 'react-redux'
import { createComment, getCommentsByIssue, getIssueById, getUserById } from '../../services/apiCalls'
import './DetailUser.css'
import { useEffect } from 'react'
import { userData } from '../../app/slices/userSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'



export const DetailUser = ({ id }) => {
    const params = useParams()

    const rdxUser = useSelector(userData)
    const [userSelected, setUserSelected] = useState([])
    const [comments, setComments] = useState([{}])
    // const [bodyDataComment, setBodyDataComment] = useState(
    //     {  issueId: params.id,
    //         comment: '',
    //     },
    // )     

    useEffect(() => {
        const getUser = async () => {
            const response = await getUserById(rdxUser.token, params.id)
            setUserSelected(response.data)
        }
        getUser()
    }, [])

    // useEffect(() => {
    //     const getComments = async () => {
    //         const response = await getCommentsByIssue(rdxUser.token, params.id)
    //         setComments(response.data.comments)
    //     }
    //     getComments()
    // }, [])

    const inputHandler = (e) => {
        setBodyDataComment((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    // const postComment = async () => {
    //     // console.log(bodyDataComment);
    //     const response = await createComment(rdxUser.token, bodyDataComment)
    //     setComments([...comments, response.data])

    return (
        <div className="detailUser">
            <div className="detailUser-container">
                <div className="container1">
                    <div className="container-fields">
                        <label>Nombre</label>
                        <p className='styled-p'> {userSelected.name}</p>
                    </div>
                    <div className="container-fields">
                        <label>Apellidos</label>
                        <p className='styled-p'>{userSelected.surname}</p>
                    </div>
                    <div className="container-fields">
                        <label>Email</label>
                        <p className='styled-p'>{userSelected.email}</p>
                    </div>
                </div>
            </div>
        </div >
       
    )
}