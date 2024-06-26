import "./ListIssuesSuperAdmin.css"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { getIssues, getMyIssues } from "../../services/apiCalls"
import { useNavigate } from 'react-router-dom';
import { Button } from "../../common/Button/Button"


export const ListIssuesSuperAdmin = () => {
    const rdxUser = useSelector(userData)
    const [MyIssues, setMyIssues] = useState([])
    const navigate = useNavigate();

    const handleDetailClick = (id) => {
        navigate(`/admin/issue/${id}`);
    }
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

    useEffect(() => {
        const fetchMyIssues = async () => {
            const response = await getIssues(rdxUser.token)
            console.log(response.data);
            setMyIssues(response.data)
        }
        fetchMyIssues()
    }, [])

    return (
        <>
            {/* <div className="button-container">
                <Button
                    title={"Nueva incidencia"}
                    className="ButtonDesign"
                    onClick={navigateToNewIssue}
                />
            </div> */}
            <div className="my-issues-dessign">
                <div className="table-my-issues">
                    <DataTable
                        columns={columns}
                        title="Incidencias"
                        data={MyIssues}
                        onRowClicked={row => handleDetailClick(row.id)}
                        selectableRowsSingle
                        pagination
                        paginationPerPage={10}
                        fixedHeader
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
        </>
    )
}
