import React, { useEffect, useRef } from 'react';

const Radar = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 120; // 120 km radius
    const circleInterval = 40; // 40 km interval
    const textPadding = 15; // Padding for direction labels

    // Set background color to black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    

    

    
    // Center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();

    // Radar sweep
    let angle = 0;
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Redraw background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw concentric circles
      for (let radius = circleInterval; radius <= maxRadius; radius += circleInterval) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'green';
        ctx.stroke();
      }

      // Draw radar perimeter
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      // Draw lines for cardinal directions
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - maxRadius - textPadding);
      ctx.lineTo(centerX, centerY + maxRadius + textPadding);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius - textPadding, centerY);
      ctx.lineTo(centerX + maxRadius + textPadding, centerY);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      // Draw cardinal direction labels
      ctx.font = '20px Arial bold';
      ctx.fillStyle = 'white';
      ctx.fillText('N', centerX - 5, centerY - maxRadius - 2 * textPadding);
      ctx.fillText('S', centerX - 5, centerY + maxRadius + 3 * textPadding);
      ctx.fillText('E', centerX + maxRadius + 2 * textPadding, centerY + 5);
      ctx.fillText('W', centerX - maxRadius - 3 * textPadding, centerY + 5);

      // Center point
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'green';
      ctx.fill();

      // Draw sweep
      const x = centerX + maxRadius * Math.cos(angle);
      const y = centerY + maxRadius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      angle += Math.PI / 40; // Change the speed here
    }, 100); // Change the interval here
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      style={{ display: 'block', margin: 'auto', paddingTop: '40px' }}
    />
  );
};

export default Radar;
