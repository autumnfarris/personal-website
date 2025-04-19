"use client";

import { useEffect, useState } from "react";

interface Leaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  speed: number;
  swingSpeed: number;
  swingAmount: number;
  swingOffset: number;
}

export default function AutumnLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Define autumn colors
    const autumnColors = [
      "#E6A74C", // Orange
      "#BB482D", // Red
      "#CDAD5D", // Yellow
      "#74480F", // Brown
      "#D4662F", // Dark orange
    ];

    // Create initial leaves
    const initialLeaves: Leaf[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -50, // Start above the viewport
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: autumnColors[Math.floor(Math.random() * autumnColors.length)],
      speed: 0.3 + Math.random() * 0.5,
      swingSpeed: 0.5 + Math.random() * 2,
      swingAmount: 1 + Math.random() * 3,
      swingOffset: Math.random() * Math.PI * 2,
    }));

    setLeaves(initialLeaves);

    // Animation loop
    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = currentTime;

      setLeaves((prevLeaves) =>
        prevLeaves.map((leaf) => {
          // Calculate horizontal swing based on sine wave
          const swingX =
            Math.sin(
              (currentTime / 1000) * leaf.swingSpeed + leaf.swingOffset
            ) * leaf.swingAmount;

          // Update leaf position
          let newY = leaf.y + leaf.speed * deltaTime;
          let newX = leaf.x + swingX * 0.1 * deltaTime;

          // Reset leaf when it goes below viewport
          if (newY > 100) {
            newY = Math.random() * -10 - 5;
            newX = Math.random() * 100;
          }

          // Keep leaf within horizontal boundaries
          if (newX < -5) newX = -5;
          if (newX > 105) newX = 105;

          return {
            ...leaf,
            x: newX,
            y: newY,
            rotation: leaf.rotation + 0.2 * deltaTime * (Math.random() - 0.5),
          };
        })
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup animation on component unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] leaves-container">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute leaf-element"
          style={{
            left: `${leaf.x}vw`,
            top: `${leaf.y}vh`,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C7.9 4.1 5 8.4 5 13.5C5 15.8 5.9 17.8 7.3 19.2C7.5 19.4 7.7 19.6 8 19.8C8.7 20.2 9.5 20.6 10.4 20.8C11 21 11.6 21 12.3 21C12.9 21 13.5 20.9 14.1 20.8C14.9 20.6 15.6 20.3 16.2 19.8C16.4 19.6 16.7 19.4 16.9 19.2C18.1 17.9 19 15.9 19 13.5C19 8.4 16.2 4.1 12 2Z"
              fill={leaf.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}