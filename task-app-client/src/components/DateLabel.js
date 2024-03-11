import React from "react";

function DateLabel({ label, date }) {

  return (
    <div>
      <label className="block text-sm font-semibold leading-6 text-gray-900">
        {label}
      </label>
      <label className="mt-2.5 block text-md font-bold leading-6 text-gray-900">
        {date.substring(0,10)}
      </label>
    </div>
  );
}

export default DateLabel;
