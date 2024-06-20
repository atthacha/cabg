import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownHistory, setCountdownHistory] = useState([]);

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000);
    }

    if (countdown === 0) {
      const startTime = new Date(Date.now() - (seconds * 1000)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const endTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      setCountdownHistory((prevHistory) => [
        ...prevHistory,
        { id: prevHistory.length + 1, startTime, endTime, totalTime: seconds },
      ]);
      setIsRunning(false);
    }

    setIntervalId(timer);

    return () => clearInterval(timer);
  }, [isRunning, countdown, remainingTime, seconds]);

  const handleInputChange = (e) => {
    setSeconds(e.target.value);
  };

  const startCountdown = () => {
    const countdownSeconds = parseInt(seconds, 10) || 0;
    setCountdown(countdownSeconds);
    setRemainingTime(countdownSeconds);
    setIsRunning(true);
  };

  const stopCountdown = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resumeCountdown = () => {
    setCountdown(remainingTime);
    setIsRunning(true);
  };

  const resetCountdown = () => {
    clearInterval(intervalId);
    setSeconds('');
    setCountdown(0);
    setRemainingTime(0);
    setIsRunning(false);
    setCountdownHistory([]);
  };

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds === 0) {
      return '00 hr 00 min 00 sec';
    }

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')} hr ${minutes.toString().padStart(2, '0')} min ${remainingSeconds.toString().padStart(2, '0')} sec`;
  };

  return (
    <div className="countdown-container">
      <input
        type="number"
        value={seconds}
        onChange={handleInputChange}
        placeholder="Enter seconds"
        className="input-field"
      />
      <div className="button-container">
        <button
          onClick={startCountdown}
          disabled={isRunning}
          className="button start-button"
        >
          Start Countdown
        </button>
        <button
          onClick={stopCountdown}
          disabled={!isRunning}
          className="button stop-button"
        >
          Stop Countdown
        </button>
        <button
          onClick={resumeCountdown}
          disabled={isRunning || remainingTime === 0}
          className="button resume-button"
        >
          Resume Countdown
        </button>
        <button
          onClick={resetCountdown}
          disabled={!countdownHistory.length && !isRunning && !seconds}
          className="button reset-button"
        >
          Reset
        </button>
      </div>
      <div className="countdown-display">{formatTime(countdown)}</div>
      {countdownHistory.length > 0 && (
        <table className="history-table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>เวลาที่เริ่ม</th>
              <th>เวลาที่จบ</th>
              <th>เวลาที่ใช้นับถอยหลัง (วินาที)</th>
            </tr>
          </thead>
          <tbody>
            {countdownHistory.map((history) => (
              <tr key={history.id}>
                <td>{history.id}</td>
                <td>{history.startTime}</td>
                <td>{history.endTime}</td>
                <td>{history.totalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CountdownTimer;