import React, { useEffect, useState } from 'react'
import "./UsersSuperAdmin.css"
import { deleteUserbyAdmin, getUsers } from '../../services/apiCalls'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { Header } from "../../common/Header/Header";

export const UsersSuperAdmin = () => {
  const [usersData, setUsersData] = useState([])
  const [usersSelected, setUsersSelected] = useState([])

  const columns = [
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
      name: "Fecha de creación",
      selector: row => {
        const date = new Date(row.createdAt)
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
      }
    }
  ]

  // Efecto para obtener los datos de los usuarios cuando el componente se monta
  useEffect(() => {
    const getUserByAdmin = async () => {
      const users = await getUsers()
     
      setUsersData(users.data)
    }
    getUserByAdmin()
  }, [])


  const handleRowChange = ({ selectedRows }) => {
    setUsersSelected(selectedRows)
  }

  
  const deleteUser = async () => {
    try {
      const userToDeleteSelected = usersSelected[0].id
      const userToDelete = await deleteUserbyAdmin(userToDeleteSelected)

      const updateTableUsers = await getUsers()

      setUsersData(updateTableUsers.data)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
   
      <div className='adminDesign'>
        <div className="tableUser">
          <DataTable
            className='table'
            title="Usuarios"
            columns={columns}
            data={usersData}
            onSelectedRowsChange={handleRowChange}
            selectableRows
            selectableRowsSingle
            pagination
            paginationPerPage={5}
            fixedHeader
          />
          <button onClick={deleteUser}>Eliminar usuario</button>
        </div>
      </div>
    </>
  )
}
