import React, { useEffect, useState } from "react";

function StatusBadge({ type }) {
  const [color,setColor] = useState("green")
  

  useEffect(()=>{
    const colorMap = {
      "To Do": "red-900",
      "Completed": "green-500",
      "In Progress": "cyan-900",
    };
    setColor(colorMap[type])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type])

  return (
    <button
      className={`align-middle ml-1 font-sans font-bold text-center uppercase text-xs py-3 px-6 rounded-lg bg-${color} text-white`}
      type="button"
    >
      {type}
    </button>
  );
  // return (
  //   <span className={`bg-${color[type]}-100 text-${color[type]}-800 border-solid border-2 border-sky-500 text-sm font-medium me-2 px-2.5 py-2.5 m-1 rounded-md dark:bg-${color[type]}-900 dark:text-${color[type]}-300`}>{type}</span>
  // )
}

export default StatusBadge;
