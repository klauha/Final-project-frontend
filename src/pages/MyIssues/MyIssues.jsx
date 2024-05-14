
import "./MyIssues.css"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { getMyIssues } from "../../services/apiCalls"
import { useNavigate } from 'react-router-dom';
import { Button } from "../../common/Button/Button"


export const MyIssues = () => {
    const rdxUser = useSelector(userData)
    const [MyIssues, setMyIssues] = useState([])
    const [issueSelected, setIssueSelected] = useState([])
    const navigate = useNavigate();

    const handleDetailClick = (id) => {
        navigate(`/issue/${id}`);
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
            selector: row => row.status
        },
        {
            name: "Ver detalle",
            cell: (row) => (
                <button className="btn btn-primary" onClick={() => handleDetailClick(row.id)}>
                    <i className="material-icons">visibility</i>
                </button>
            )
        }
    ]

    useEffect(() => {
        const fetchMyIssues = async () => {
            const response = await getMyIssues(rdxUser.token)
            console.log(response)
            setMyIssues(response.data)
        }
        fetchMyIssues()
    }, [])

    const handleRowSelected = ({ selectedRows }) => {
        setIssueSelected(selectedRows)
        console.log(selectedRows);
    }

    const navigateToNewIssue = () => {
        navigate("/create-issue")
    }
    return (
        <>
         
                <div className="button-container">
                    <Button
                        title={"Nueva incidencia"}
                        className="ButtonDesign"
                        onClick={navigateToNewIssue}
                    />
                </div>
                <div className="my-issues-dessign">
                <div className="table-my-issues">
                    <DataTable
                        columns={columns}
                        title="Mis incidencias"
                        data={MyIssues}
                        onRowClicked={row => handleDetailClick(row.id)}
                        selectableRowsSingle
                        pagination
                        paginationPerPage={10}
                        fixedHeader
                    />
                </div>
                <div className="container-issue-selected">
                    <issueSelected issueSelected={issueSelected} />
                </div>

            </div>
        </>
    )

}
