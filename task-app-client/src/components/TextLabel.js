import React from 'react'

function TextLabel({label,value}) {
  return (
    <div className='sm:col-span-2'>
      <label className="block text-sm font-semibold leading-6 text-gray-900">
        {label}
      </label>
      <label className="mt-2.5 block text-md font-bold leading-6 text-gray-900">
        {value}
      </label>
    </div>
  )
}

export default TextLabel