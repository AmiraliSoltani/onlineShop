import React, { useEffect, useState } from 'react';
import './Countdown.scss'; // Ensure this is the correct path

const Countdown = (props) => {
  const { product } = props;

  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateDiscountTime = () => {
    const now = new Date();
    const discount = new Date(product.offerTime);
    const leftTime = discount - now;

    if (leftTime < 0) return false;

    const days = Math.floor(leftTime / 86400000);
    const hours = Math.floor((leftTime - days * 86400000) / 3600000);
    const minutes = Math.floor((leftTime - days * 86400000 - hours * 3600000) / 60000);
    const seconds = Math.floor((leftTime - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const time = calculateDiscountTime();
      if (time) {
        setTimeRemaining(time);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [product]);

  return (
    <div className="countdown">
      <div className="bloc-time hours">
        <div className="figure">
          <span className="top">{Math.floor(timeRemaining.hours / 10)}</span>
          <span className="bottom">{Math.floor(timeRemaining.hours / 10)}</span>
        </div>
        <div className="figure">
          <span className="top">{timeRemaining.hours % 10}</span>
          <span className="bottom">{timeRemaining.hours % 10}</span>
        </div>
        <span className="count-title">Hours</span>
      </div>

      <div className="bloc-time min">
        <div className="figure">
          <span className="top">{Math.floor(timeRemaining.minutes / 10)}</span>
          <span className="bottom">{Math.floor(timeRemaining.minutes / 10)}</span>
        </div>
        <div className="figure">
          <span className="top">{timeRemaining.minutes % 10}</span>
          <span className="bottom">{timeRemaining.minutes % 10}</span>
        </div>
        <span className="count-title">Minutes</span>
      </div>

      <div className="bloc-time sec">
        <div className="figure">
          <span className="top">{Math.floor(timeRemaining.seconds / 10)}</span>
          <span className="bottom">{Math.floor(timeRemaining.seconds / 10)}</span>
        </div>
        <div className="figure">
          <span className="top">{timeRemaining.seconds % 10}</span>
          <span className="bottom">{timeRemaining.seconds % 10}</span>
        </div>
        <span className="count-title">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
