import React, { useContext, useState } from "react";
import InlineWarning from "../components/InlineWarning";
import axios from "axios";
import { BASE_URL, LOCAL_STORAGE_KEY } from "../utils/Constants";
import { GlobalStateContext } from "../utils/GlobalState";
import CustomDialog from "../components/CustomDialog";
import { useDialog } from "../hooks/CustomHooks";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warnings, setWarnings] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(GlobalStateContext);
  const navigate = useNavigate()

 const {setDialogMessage,showDialog,dialogMessage,setShowDialog} = useDialog("")

  const addWarning = (message) => {
    if (!warnings.includes(message)) setWarnings([...warnings, message]);
  };

  const removeWarning = (message) => {
    const newWarnings = warnings.filter((warning) => warning !== message);
    setWarnings(newWarnings);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (warnings.length === 0 && email && password) {
      axios
        .post(`${BASE_URL}/login`, {
          email,
          password,
        })
        .then((response) => {
          dispatch({ type: "SET_TOKEN", payload: response.data });
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(response.data)
          );
          navigate("/tasks")
        })
        .catch((err) => {
          let errMessage = "Something went wrong ! Please try again later"
          if (err.response && err.response.data) {
            errMessage = err.response.data.message
          }
          setDialogMessage(errMessage)
        });
    }
  };

  const emailChange = (e) => {
    const email = String(e.target.value);
    setEmail(email);
    const message = "Invalid email";
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      addWarning(message);
    } else {
      removeWarning(message);
    }
  };

  const passwordChange = (e) => {
    const password = String(e.target.value);
    const message = "Password needs to be at least 8 characters";
    setPassword(password);
    if (password.length < 8) {
      addWarning(message);
    } else {
      removeWarning(message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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
                <div className="text-sm">
                  <a
                    href="/forgotPassword"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
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
            <ul className="">
              {warnings.map((warning, index) => (
                <InlineWarning message={warning} key={index} />
              ))}
            </ul>
            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
{      <CustomDialog open={showDialog} message={dialogMessage} setOpen={setShowDialog}/>
}    </>
  );
}

export default Login;
