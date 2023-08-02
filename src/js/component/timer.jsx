import React, { useState, useEffect } from 'react';
import Square from './square';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => (prevSeconds < 3600 ? prevSeconds + 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalId);
    }


    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const timeString = formatTime(seconds);
  const digits = timeString.split('').map((digit, index) => (
    <Square key={index} value={digit} />
  ));

  
  while (digits.length < 6) {
    digits.unshift(<Square key={digits.length} value="0" />);
  }

  return (
    <div>
      <div className="timer-container">
        {digits}
      </div>
     
    </div>
  );
};

export default Timer;