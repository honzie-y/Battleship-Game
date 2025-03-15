import { useEffect, useState } from "react";

const Timer = ({isRunning}) => {
  
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
        intervalId = setInterval(() => {
            setTime(prevTime => prevTime + 1000);
        }, 1000);
    } else {
        reset(); // ** use this design for now, may change later
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const reset = () => {
    setTime(0);
  }

  const formatTime = () => {
    const seconds = `${Math.floor((time / 1000) % 60)}`.padStart(2, '0');
    const minutes = `${Math.floor((time / 60000) % 60)}`.padStart(2, '0');
    const hours = `${Math.floor((time / 3600000) % 24)}`.padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div>{formatTime()}</div>
  )
}

export default Timer;