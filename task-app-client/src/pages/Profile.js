import React, { useContext, useEffect, useState } from "react";
import BackGround from "../components/BackGround";
import { GlobalStateContext } from "../utils/GlobalState";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [state, ] = useContext(GlobalStateContext);
  const navigate = useNavigate()
  const [user,setUser] =useState({name:"",email:"",link:""})
  const onClick = () => {
    navigate("/editProfile")
  }


  useEffect(()=>{
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios.get(`${BASE_URL}/user`,config)
      .then(response =>{
        setUser(response.data[0])
      })
      .catch(err=>{
        //setDialogMessage("Something went wrong ! Please try again later");
      })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <BackGround />
      <div className="mx-auto mt-4 max-w-xl sm:mt-5">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <img className="mx-auto sm:col-span-2 h-20 w-20 border-solid border-2 border-sky-500 rounded-sm p-1" src={user.link} alt="" />
          <h3 className="max-auto sm:col-span-2 text-gray-900 text-center" > <span className="font-semibold">Email : </span>{user.email}</h3>
          <h3 className="max-auto sm:col-span-2 text-gray-900 text-center" > <span className="font-semibold">Name : </span>{user.name}</h3>
          <div className="mx-auto sm:col-span-2"><Button text={"Edit Profile"} onClick={onClick}/></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
