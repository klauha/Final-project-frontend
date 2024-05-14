import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { Input } from '../../common/Input/Input'
import { editProfiles, getProfile } from '../../services/apiCalls'
import { Button } from '../../common/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userData } from '../../app/slices/userSlice'

export const Profile = () => {
  const [userProfile, setUserProfile] = useState({})
  const [hadleInputDisable, setHandleInputDisable] = useState(true)
  const rdxUser = useSelector(userData)
  const navigate = useNavigate()



  useEffect(() => {
    const getUserProfile = async () => {
      const result = await getProfile(rdxUser.token)
console.log(result.data);
      setUserProfile(result.data);
    }
    getUserProfile()
  }, [])


  const editData = () => {
    setHandleInputDisable(!hadleInputDisable)
  }

  const editProfileUser = async () => {
    try {
console.log(1);
      const dataToUpdate = {
        firstName: userProfile.first_name,
        lastName: userProfile.last_name,
      }
      console.log(dataToUpdate);
     
      const updateUserProfile = await editProfiles(dataToUpdate, rdxUser.token)
    } catch (error) {

    } finally {
      setHandleInputDisable(!hadleInputDisable)
    }
  }

  const inputHandler = (e) => {
    setUserProfile((prevState) => (
      {
        ...prevState,
        [e.target.name]: e.target.value
      }
    ))
  }

  return (
    <>
      <div className='profileDesign'>
        <div className='dataUser'>
          
          <Input
            className="inputProfileDesign"
            type="text"
            name="first_name"
            value={userProfile.firstName || ""}
            disabled={hadleInputDisable}
            onChangeFunction={inputHandler}
          ></Input>
          <Input
            className="inputProfileDesign"
            type="text"
            name="last_name"
            value={userProfile?.lastName ?? ""}
            disabled={hadleInputDisable}
            onChangeFunction={(e) => inputHandler(e)}
          ></Input>
           <Input
            className="inputProfileDesign"
            type="text"
            name="nickname"
            value={userProfile.nickname || ""}
            disabled={true}
          ></Input>
          
          <Input
            className="inputProfileDesign"
            type="text"
            name="email"
            value={userProfile.email || ""}
            disabled={true}
          ></Input>
            
          <div className="buttons">
            <Button
              title={"Editar"}
              className="ButtonDesign"
              onClick={editData}
            />
            <Button
              title={"Actualizar"}
              className="ButtonDesign"
              onClick={editProfileUser}
            />
          </div>

        </div>
      </div>
    </>
  )
}