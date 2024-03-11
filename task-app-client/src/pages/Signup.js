import React, { useState } from "react";
import InlineWarning from "../components/InlineWarning";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import CustomDialog from "../components/CustomDialog";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warnings,setWarnings] = useState([])

  const [dialogMessage,setDialogMessage]=useState("")
  const [showDialog, setShowDialog] = useState(false)

  const addWarning = (message) => {
    if(!warnings.includes(message))
        setWarnings([...warnings,message])
  }

  const removeWarning =(message) => {
    const newWarnings = warnings.filter(warning=>warning!==message)
        setWarnings(newWarnings)
  }

  const emailChange = (e) => {
    const email = String(e.target.value)
    setEmail(email);
    const message = "Invalid email"
    if(!email.match(/^[^@]+@[^@]+\.[^@]+$/)){
        addWarning(message)
    } else {
        removeWarning(message)
    }
  };

  const passwordChange = (e) => {
    const password = String(e.target.value)
    const message = "Password needs to be at least 8 characters"
    setPassword(password);
    if(password.length<8){
        addWarning(message)
    } else {
        removeWarning(message)
    }
  };

  const password2Change = (e) => {
    const message = "passwords dont match"
    setPassword2(e.target.value);
    if(password!==e.target.value){
        addWarning(message)
    } else {
        removeWarning(message)
    }
  };

  const onSignupHandler = (event) =>{
    event.preventDefault()
    if(warnings.length === 0 && email && password){
        axios.post(`${BASE_URL}/signup`,{
            email,
            password
        })
        .then(response=>{
            setDialogMessage("Signed up !! Please check your email for verification link")
            setShowDialog(true)
        })
        .catch(err=>{
            //console.log(err.response)
            if(err.response && err.response.data){
                setDialogMessage(err.response.data.message)
            } else {
                setDialogMessage("Something went wrong ! Please try again later")
            }
            setShowDialog(true)
        })
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up ...
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={emailChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={passwordChange}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Renter Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password2}
                  onChange={password2Change}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <ul className="">
                {
                    warnings.map((warning, index) => <InlineWarning message={warning} key={index}/>)
                }
            </ul>

            <div>
              <button
                onClick={onSignupHandler}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      <CustomDialog open={showDialog} message={dialogMessage} setOpen={setShowDialog}/>
    </>
  );
}

export default Signup;
