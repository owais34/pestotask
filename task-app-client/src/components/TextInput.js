import React from "react";

function TextInput({ label, value, setValue, maxLength = 100 }) {


  const onChange = (e) =>{
    setValue(e.target.value)
  }

  return (
    <div className="sm:col-span-2">
      <label
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          value={value}
          onChange={onChange}
          type="text"
          name="title"
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          maxLength={maxLength}
        />
      </div>
    </div>
  );
}

export default TextInput;
