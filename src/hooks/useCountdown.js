import { useState, useEffect } from 'react';

const useCountdown = (initialCount, onFinish) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onFinish();
    }
  }, [count, onFinish]);

  return count;
};

export default useCountdown;
