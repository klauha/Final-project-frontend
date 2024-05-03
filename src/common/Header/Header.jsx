import React, { useEffect } from 'react'
import "./Header.css"
import { CustomLink } from '../CustomLink/CustomLink'
import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutRdx, userData } from '../../app/slices/userSlice';
import logo from '/img/logo.png'


export const Header = () => {
  //Instancia de conexion a modo lectura
//   const rdxUser = useSelector(userData);

  //Instancia de conexion a modo escritura
//   const dispatch = useDispatch();
//   // useEffect(() => {
//   //   console.log(rdxUser, " credenciales pasaporte");
//   // }, [rdxUser]);

  const navigate = useNavigate()

  const handleLogout = () => {
    // Eliminamos el token del store y actualizamos el estado local
    dispatch(logoutRdx({ token: "" }))
    navigate("/login")
  }

  return (
    <>
      {
        rdxUser.token ? (<div className='headerDesign'>
          <img src={logo} alt="Logo" className='logo-style' />
          <div className="header-logout" >
          <CustomLink
                title={(rdxUser.role != "user") ? rdxUser.role : ""}
                path={"/admin/users"}
              />
            {/* {(rdxUser.role != "user") ? rdxUser.role : ""} */}
            {/* path={"/admin/users"} */}

          </div>

          <div className="header-logout" onClick={handleLogout}>
            Log Out
          </div>
        </div>

        ) : (
          <div className='headerDesign'>
            <img src={logo} alt="Logo" className='logo-style' />
            <div className="links-container">
              <CustomLink
                title={"Home"}
                path={"/"}
              />

              <CustomLink
                title={"Registro"}
                path={"/register"}

              />
              <CustomLink
                title={"Login"}
                path={"/login"}
              />
            </div>
          </div>
        )}
    </>
  )
}

