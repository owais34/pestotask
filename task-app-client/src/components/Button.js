import React from 'react'

const classNames = {
  'indigo':`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
  'red':"block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
}


function Button({text,onClick,color='indigo'}) {

  const btnClick = (e) =>{
    e.preventDefault();
    onClick()
  }
  return (
    <div className="mt-5">
    <button
      onClick={btnClick}
      type="submit"
      className={classNames[color]}
    >
      {text}
    </button>
  </div>
  )
}

export default Button