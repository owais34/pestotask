import React from 'react'

export default function InlineWarning({message}) {
  return (
    <li className='bg-red-200 rounded-sm text-red-700 p-1'>
        <span>&#8226;</span>{message}
    </li>
  )
}
