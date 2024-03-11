/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { LOCAL_STORAGE_KEY } from '../utils/Constants'
import { GlobalStateContext } from '../utils/GlobalState'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const [state,dispatch] = useContext(GlobalStateContext)
  const navigate = useNavigate()
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify({}))
    dispatch({type:"RESET"})
    navigate("/")
  },[])

  return (
    <div>Logout</div>
  )
}

export default Logout