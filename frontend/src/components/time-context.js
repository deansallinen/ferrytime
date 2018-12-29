import React, { useState, useEffect } from 'react';

export const TimeContext = React.createContext(new Date())

export const useTime = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  })
  
  return time;
}