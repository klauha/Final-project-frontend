import { useSelector } from 'react-redux'
import { createComment, deleteUserbyAdmin, getAllIssuesByUser, getCommentsByIssue, getIssueById, getUserById } from '../../services/apiCalls'
import './DetailUser.css'
import { useEffect } from 'react'
import { userData } from '../../app/slices/userSlice'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../common/Input/Input'
import { Button } from '../../common/Button/Button'
import DataTable from 'react-data-table-component'



export const DetailUser = ({ id }) => {
    const params = useParams()
    const rdxUser = useSelector(userData)
    const navigate = useNavigate()
    const [userSelected, setUserSelected] = useState([{}])
    const [userIssues, setUserIssues] = useState([])


    useEffect(() => {
        const getUser = async () => {
            const response = await getUserById(params.id, rdxUser.token)
            setUserSelected(response.data)
        }
        getUser()
    }, [])
    useEffect(() => {
        const getIssues = async () => {
            const response = await getAllIssuesByUser(rdxUser.token, params.id)
            setUserIssues(response.data)
        }
        getIssues()
    })

    const columns = [
        {
            name: "Referencia",
            selector: (row) => row.id
        },
        {
            name: "Fecha",
            selector: row => {
                const date = new Date(row.created_at);
                return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
            }
        },
        {
            name: "Departamento",
            selector: row => row.department.name
        },
        {
            name: "Tipo de incidencia",
            selector: row => row.issue_type.name
        },
        {
            name: "Titulo",
            selector: row => row.title
        },
        {
            name: "Description",
            selector: row => row.description
        },
        {
            name: "Estado",
            cell: row => {
                let color;
                switch (row.status) {
                    case 'ABIERTA':
                        color = 'green';
                        break;
                    case 'EN TRÁMITE':
                        color = 'yellow';
                        break;
                    case 'CERRADA':
                        color = 'red';
                        break;
                }
                return <span style={{ backgroundColor: color, color: 'white' }}>{row.status}</span>;
            }
        }

    ]
    const deleteUser = async (user) => {

        if (window.confirm('¿Estás seguro de que quieres eliminar a este usuario?')) {
            try {
                const response = await deleteUserbyAdmin(userSelected.id, rdxUser.token)
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
    }
    const handleDetailClick = (id) => {
        navigate(`/admin/issue/:id`)
    }
    // const handleRowChange = (selectedRows) => {
    //     setUserIssues(selectedRows)
    // }

    return (
        <>
            <div className="detailUser">
                <div className="detailUser-container">
                    <div className="container-data">
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
                        <div className="container-fields">
                            <label>Rol</label>
                            <p className='styled-p'>{userSelected.role?.title}</p>
                        </div>
                        <div className="container-button">
                            <Button
                                title={"Eliminar usuario"}
                                className="ButtonDesign"
                                onClick={deleteUser}
                            />

                        </div>
                    </div>
                </div>
                <div className="my-issues-dessign">
                    <div className="table-my-issues">
                        <DataTable
                            columns={columns}
                            title="Historial de incidencias"
                            data={userIssues}
                            onRowClicked={row => handleDetailClick(row.id)}
                            selectableRowsSingle
                            pagination
                            paginationPerPage={5}
                            fixedHeader
                            noDataComponent={<div>No hay incidencias registradas</div>}
                            conditionalRowStyles={[
                                {
                                    when: row => true,
                                    style: {
                                        '&:hover': {
                                            backgroundColor: '#b1efe9',
                                        },
                                    },
                                },
                            ]}
                        />
                    </div>
                </div>
            </div >
        </>
    )
}