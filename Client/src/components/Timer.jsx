import { useState } from 'react';
import Countdown from 'react-countdown';
import './Timer.css';

export default function QOTDTimer() {
  // Use state initializer to ensure stable value and purity
  const [endTime] = useState(() => Date.now() + 1000 * 60 * 60 * 8); // 8 hours

  return (
    <div className="timer-container">
      <div className="timer-icon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <div className="timer-content">
        <span className="timer-label">Time Remaining</span>
        <Countdown
          date={endTime}
          renderer={({ hours, minutes, seconds }) => (
            <span className="timer-value">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </span>
          )}
        />
      </div>
    </div>
  );
}
