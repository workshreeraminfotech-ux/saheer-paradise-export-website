import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const target = parseInt(end, 10);
    if (isNaN(target)) return;

    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = (currentTime - startTime) / 1000;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        // Ease out quadratic
        const currentProgress = 1 - (1 - progress) * (1 - progress);
        setCount(Math.floor(start + currentProgress * (target - start)));
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}
