import React from 'react'
import { BeatLoader } from "react-spinners";
const Loading = () => {
  return (
    <div>
        <BeatLoader
            color="#005368"
            margin={5}
            size={12}
        />
    </div>
  )
}

export default Loading