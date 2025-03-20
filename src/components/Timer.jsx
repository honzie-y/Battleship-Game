import { useEffect, useState } from "react";

const Timer = ({time}) => {
  
  const formatTime = () => {
    const seconds = `${Math.floor(time % 60)}`.padStart(2, '0');
    const minutes = `${Math.floor((time / 60) % 60)}`.padStart(2, '0');
    const hours = `${Math.floor((time / 3600) % 24)}`.padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div>{formatTime()}</div>
  )
}

export default Timer;