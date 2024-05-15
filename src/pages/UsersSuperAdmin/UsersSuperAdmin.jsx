import React, { useEffect, useState } from 'react'
import "./UsersSuperAdmin.css"
import { deleteUserbyAdmin, getUsers } from '../../services/apiCalls'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { Header } from "../../common/Header/Header";
import { useSelector } from 'react-redux'
import { userData } from '../../app/slices/userSlice'

export const UsersSuperAdmin = () => {
  const [usersData, setUsersData] = useState([])
  const [usersSelected, setUsersSelected] = useState([])
  const rdxUser = useSelector(userData)
  const navigate = useNavigate()

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
      name: "Fecha",
      selector: row => {
        const date = new Date(row.created_at);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
      }
    },
  ]

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

  // const deleteUser = async () => {
  //   try {
  //     const userToDeleteSelected = usersSelected[0].id
  //     console.log(`Deleting user with ID: ${userToDeleteSelected}`)
  //     const userToDelete = await deleteUserbyAdmin(userToDeleteSelected, rdxUser.token)
  //     const updateTableUsers = await getUsers(rdxUser.token)
  //     setUsersData(updateTableUsers.data)
  //     setUsersSelected([])
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <div className='adminDesign'>
        <div className="tableUser">
          <DataTable
            className='table'
            title="Usuarios"
            columns={columns}
            data={usersData}
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
