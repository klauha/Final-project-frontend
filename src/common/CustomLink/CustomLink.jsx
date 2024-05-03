import React from 'react'
import "./CustomLink.css"
import { useNavigate,useLocation } from 'react-router-dom'

export const CustomLink = ({title, path, hideIfActive}) => {
  const navigate = useNavigate ()
  const location = useLocation ()
  
  const handleClick = () => {
    navigate(path);
  };

  if (hideIfActive && location.pathname === path) {
    return null;
  }
  return (
    <div className='linkDesign' onClick={(handleClick)=> navigate(path)}>
      {title}
    </div>
  )
}