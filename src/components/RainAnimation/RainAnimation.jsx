import React, { useEffect, useState } from 'react'
import './RainAnimation.css';
function RainAnimation() {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    const createRaindrop = () => {
      const newDrop = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        speed: Math.random() * 2 + 1
      };
      setRaindrops(prevDrops => [...prevDrops, newDrop]);
    };
    // Add a new drop every 100ms
    const interval = setInterval(createRaindrop, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateRain = () => {
      setRaindrops(prevDrops => 
        prevDrops.map(drop => ({
          ...drop,
          y: (drop.y || 0) + drop.speed,
        }))
        .filter(drop => drop.y < window.innerHeight) // remove off screen drops
      );
      requestAnimationFrame(animateRain);
    };
    requestAnimationFrame(animateRain);
  }, []);

  return (
    <div className='rain-container'>
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: drop.x,
            top: drop.y,
            animationDuration: `${10 / drop.speed}s`,
          }}
        />
      ))}

    </div>
  )
}

export default RainAnimation
