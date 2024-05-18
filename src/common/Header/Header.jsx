import React, { useEffect } from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRdx, userData } from '../../app/slices/userSlice';
import { CustomLink } from '../CustomLink/CustomLink';
import logo from '/img/logo.png'
import { Link } from 'react-router-dom';


export const Header = () => {

  const rdxUser = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {

    dispatch(logoutRdx({ token: "" }))
    navigate("/login")
  }

  let logoLinkPath;
  if (rdxUser.role === 'user') {
    logoLinkPath = '/';
  } else {
    logoLinkPath = '/admin';
  }


  return (
    <>
      {
        rdxUser.token ? (<div className='headerDesign'>
        <Link to={logoLinkPath}>
          <img src={logo} alt="Logo" className='logo-style' />
          </Link>
          <div className="header-logout" >
            <CustomLink
              title={rdxUser.name}
              path={"/profile"}
            />
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

