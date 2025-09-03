"use client";

import { useEffect, useState, useRef } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Define autumn colors
    const autumnColors = [
      "#E6A74C", // Orange
      "#BB482D", // Red
      "#CDAD5D", // Yellow
      "#74480F", // Brown
      "#D4662F", // Dark orange
    ];

    // Adjust leaf count based on device
    const leafCount = isMobile ? 20 : 50;

    // Create initial leaves
    const initialLeaves: Leaf[] = Array.from({ length: leafCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -50, // Start above the viewport
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: autumnColors[Math.floor(Math.random() * autumnColors.length)],
      speed: isMobile ? 0.4 + Math.random() * 0.3 : 0.3 + Math.random() * 0.5,
      swingSpeed: isMobile ? 0.3 + Math.random() * 1 : 0.5 + Math.random() * 2,
      swingAmount: isMobile ? 0.5 + Math.random() * 1.5 : 1 + Math.random() * 3,
      swingOffset: Math.random() * Math.PI * 2,
    }));

    setLeaves(initialLeaves);

    // Animation loop with throttling for mobile
    let animationId: number;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
      
      // Throttle animation on mobile (30fps instead of 60fps)
      if (isMobile) {
        frameCount++;
        if (frameCount % 2 !== 0) {
          animationId = requestAnimationFrame(animate);
          return;
        }
      }
      
      lastTime = currentTime;

      setLeaves((prevLeaves) =>
        prevLeaves.map((leaf) => {
          // Simplified swing calculation for mobile
          const swingMultiplier = isMobile ? 0.05 : 0.1;
          const swingX = Math.sin(
            (currentTime / 1000) * leaf.swingSpeed + leaf.swingOffset
          ) * leaf.swingAmount;

          // Update leaf position
          let newY = leaf.y + leaf.speed * deltaTime;
          let newX = leaf.x + swingX * swingMultiplier * deltaTime;

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
            rotation: leaf.rotation + (isMobile ? 0.1 : 0.2) * deltaTime * (Math.random() - 0.5),
          };
        })
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup animation on component unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] leaves-container"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    >
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute leaf-element"
          style={{
            left: `${leaf.x}vw`,
            top: `${leaf.y}vh`,
            transform: `translate3d(0, 0, 0) rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          <svg
            width={isMobile ? "20" : "24"}
            height={isMobile ? "20" : "24"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: isMobile ? 'none' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
            }}
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