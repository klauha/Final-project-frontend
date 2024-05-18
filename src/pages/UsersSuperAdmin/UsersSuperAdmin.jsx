import React, { useEffect, useState } from 'react'
import "./UsersSuperAdmin.css"
import { deleteUserbyAdmin, getUsers } from '../../services/apiCalls'
import DataTable, { createTheme } from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { Header } from "../../common/Header/Header";
import { useSelector } from 'react-redux'
import { userData } from '../../app/slices/userSlice'

export const UsersSuperAdmin = () => {
  const [usersData, setUsersData] = useState([])
  const [usersSelected, setUsersSelected] = useState([])
  const rdxUser = useSelector(userData)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  
  const handleDetailClick = (id) => {
    navigate(`/admin/users/${id}`)
  }
  

  const columns = [
    {
      name: "ID",
      selector: row => row.id
    },
    {
      name: "Nombre",
      selector: row => row.name
    },
    {
      name: "Apellidos",
      selector: row => row.surname
    },
    {
      name: "email",
      selector: row => row.email
    },
    {
      name: "Rol",
      selector: row => row.role?.title
    },
  ]
  createTheme(
    'klauha',
    {
        background: {
            default: 'transparent',
        },
        text: {
            primary: 'black',
        },
    },
    'dark',
)

  useEffect(() => {
    const getUserByAdmin = async () => {
      const users = await getUsers(rdxUser.token)

      setUsersData(users.data)
    }
    getUserByAdmin()
  }, [])

  const handleRowChange = ({ selectedRows }) => {
    setUsersSelected(selectedRows)
  }

  const filteredData = usersData.filter(item =>
    columns.some(column =>
      column.selector(item)?.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <>
      <div className='users-superadmin'>
        <div className="tableUser">
          <div className="search-input-container">
        <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          </div>
          <DataTable
            theme="klauha"
            className='table'
            title="Usuarios"
            columns={columns}
            data={filteredData}
            onRowClicked={row => handleDetailClick(row.id)}
            selectableRowsSingle
            pagination
            paginationPerPage={10}
            fixedHeader
            noDataComponent={<div>No hay usuarios para mostrar</div>}
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
