import React, { useState } from 'react'
import InlineWarning from '../components/InlineWarning'

function ForgotPassword() {
	
	const [email, setEmail] = useState("")
    const [warnings,setWarnings] = useState([])

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
    }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter email to send reset link 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
            <ul className="">
                {
                    warnings.map(warning => <InlineWarning message={warning}/>)
                }
            </ul>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
  )
}

export default ForgotPassword