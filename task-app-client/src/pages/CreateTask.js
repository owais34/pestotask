
import { useContext, useState } from 'react'
import TextInput from '../components/TextInput'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import { GlobalStateContext } from '../utils/GlobalState'
import axios from 'axios'
import { BASE_URL } from '../utils/Constants'
import { useDialog } from '../hooks/CustomHooks'
import CustomDialog from '../components/CustomDialog'
import { useNavigate } from 'react-router-dom'
import BackGround from '../components/BackGround'

export default function Example() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const {dialogMessage,setDialogMessage,setShowDialog,showDialog} = useDialog("")
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [state,dispatch] = useContext(GlobalStateContext)

  const onClick = (e) => {
    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };
    axios.post(`${BASE_URL}/task`,{
      title,
      description
    },config)
    .then(res=>{
      setDialogMessage("Created Task Successfully redirecting in 2 seconds ..")
      setTimeout(()=>{
        navigate("/tasks")
      },2000)
    })
    .catch(err =>{
      setDialogMessage("Something went wrong !! Please try again later")
    })
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <BackGround/>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Task</h2>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <TextInput label={"Title"} value={title} setValue={setTitle} maxLength={100}/>
          <TextArea label={"Description"} value={description} setValue={setDescription}/>
        </div>
        <Button text={"Create"} onClick={onClick}/>
      </form>

      <CustomDialog message={dialogMessage} open={showDialog} setOpen={setShowDialog}/>
    </div>
  )
}
