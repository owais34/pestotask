import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { GlobalStateContext } from '../utils/GlobalState'
import TextInput from '../components/TextInput'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import { useDialog } from '../hooks/CustomHooks'
import CustomDialog from '../components/CustomDialog'
import axios from 'axios'
import { BASE_URL } from '../utils/Constants'
import DateLabel from '../components/DateLabel'
import Select from '../components/Select'
import BackGround from '../components/BackGround'

function EditTask() {

  const {id} = useParams()
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(GlobalStateContext)
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [status, setStatus]=useState("To Do")
  const [creaDt,setCreaDt]=useState("")
  const [upDt, setUpDate] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [compDt, setCompDt] = useState("")
  const {dialogMessage,setDialogMessage,setShowDialog,showDialog} = useDialog("")
  const navigate = useNavigate()

  const onClick = (e) => {
    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };
    axios.patch(`${BASE_URL}/task/${id}`,{
      title,
      description,
      status
    },config)
    .then(res=>{
      setDialogMessage("Updated Task Successfully redirecting in 2 seconds ..")
      setTimeout(()=>{
        navigate("/tasks")
      },2000)
    })
    .catch(err =>{
      setDialogMessage("Something went wrong !! Please try again later")
    })
  }

  const deleteTask = () => {
    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };

    axios.delete(`${BASE_URL}/task/${id}`,config)
    .then(response=>{
      setDialogMessage("Deleted Task Successfully redirecting in 2 seconds ..")
      setTimeout(()=>{
        navigate("/tasks")
      },2000)
    })
    .catch(err =>{
      setDialogMessage("Something went wrong !! Please try again later")
    })
  }

  useEffect(()=>{
    const originalTask = state.taskList.filter(task=>{
      return task.id===Number(id)
    })
    if(originalTask.length === 0){
      navigate("/tasks")
    } else {

    setTitle(originalTask[0].title)
    setDescription(originalTask[0].description)
    setStatus(originalTask[0].status)
    setCreaDt(originalTask[0].creation_date)
    setUpDate(originalTask[0].updation_date)
    setCompDt(originalTask[0].completion_date)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <BackGround/>
      <form className="mx-auto mt-4 max-w-xl sm:mt-5">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <DateLabel label={"Created on"} date={creaDt}/>
          <DateLabel label={"Updated on"} date={upDt}/>
          <TextInput label={"Title"} value={title} setValue={setTitle} maxLength={100}/>
          <TextArea label={"Description"} value={description} setValue={setDescription}/>
          <Select label={"Change Status"} options={["To Do","In Progress","Completed"]} setSelected={setStatus} selected={status}/>
        </div>
        <Button text={"Update"} onClick={onClick}/>
        <Button text={"Delete"} onClick={deleteTask} color='red'/>
      </form>

      <CustomDialog message={dialogMessage} open={showDialog} setOpen={setShowDialog}/>
    </div>
  )
}

export default EditTask