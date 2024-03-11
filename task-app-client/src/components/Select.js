import React from "react";

function Select({options, label ,selected = options[0], setSelected}) {
  const onChange = (e) => {
    console.log(e.target.value)
    setSelected(e.target.value)
  } 
  return (
    <>
      <label
        className="block mb-2 text-lg text-nowrap	mr-1 self-center font-medium text-gray-900"
      >
        {label}
      </label>
      <select
      value={selected}
      onChange={onChange}
        className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      > {
        options.map((option, index) => {
            return <option value={option} selected key={index} >{option}</option>
        })
      }
      </select>
    </>
  );
}

export default Select;
