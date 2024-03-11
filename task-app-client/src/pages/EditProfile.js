import React, { useContext, useEffect, useState } from "react";
import BackGround from "../components/BackGround";
import Button from "../components/Button";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { GlobalStateContext } from "../utils/GlobalState";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import CustomDialog from "../components/CustomDialog";
import { useDialog } from "../hooks/CustomHooks";

function EditProfile() {
  const [state, dispatch] = useContext(GlobalStateContext);
  const [avatars, setAvatars] = useState([]);
  const [name, setName] = useState("");
  const [avatarId, setAvatarId] = useState("")
  const navigate = useNavigate()
  const {dialogMessage,setDialogMessage,setShowDialog,showDialog}  = useDialog("")

  const onClick = () => {
    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };

    axios.patch(`${BASE_URL}/user`,{
      name,
      avatar:avatarId
    },config)
    .then(response=>{
        setDialogMessage("Updated Successfully , redirecting in 2 secs ..")
        setTimeout(()=>{
          navigate("/tasks")
        }, 2000)
    })
    .catch(err=>{
      setDialogMessage("Something went wrong please try again later")
    })
  };

  const onClickAvatar = (id) =>{
    setAvatarId(id)
  }

  useEffect(() => {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios
        .get(`${BASE_URL}/user`, config)
        .then((response) => {
          setName(response.data[0].name);
          setAvatarId(response.data[0].avatar_name)
        })
        .catch((err) => {
          //setDialogMessage("Something went wrong ! Please try again later");
        });
    axios
      .get(`${BASE_URL}/avatars`)
      .then((response) => {
        setAvatars(response.data);
      })
      .catch((err) => {
        //setDialogMessage("Something went wrong ! Please try again later");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <BackGround />
      <div className="mx-auto mt-4 max-w-xl sm:mt-5">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <h3 className="sm:col-span-2 mx-auto bold">Choose Avatar :</h3>
          <div className="sm:col-span-2">
            {avatars.map((avatar) => {
              return (
                <button
                  onClick={()=>onClickAvatar(avatar.avatar_name)}
                  className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 m-1 rounded-sm"
                  key={avatar.id}
                >
                  <img
                    className="mx-auto h-20 w-20 p-1"
                    src={avatar.link}
                    alt=""
                  />
                </button>
              );
            })}
          </div>
          <TextInput label={"Update name"} setValue={setName} value={name} />
          <div className="mx-auto sm:col-span-2">
            <Button text={"update Profile"} onClick={onClick} />
          </div>
        </div>
      </div>
      <CustomDialog message={dialogMessage} open={showDialog} setOpen={setShowDialog}/>
    </div>
  );
}

export default EditProfile;
