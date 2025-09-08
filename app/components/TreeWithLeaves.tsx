"use client";

import { useEffect, useState, useMemo } from "react";

interface Leaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  opacity: number;
  swingPhase: number;
  lifeTime: number;
  isAttached: boolean;
  attachedBranchId?: number;
  attachmentX?: number;
  attachmentY?: number;
  swayAmplitude: number;
  detachmentChance: number;
  shouldStayAttached: boolean;
}


export default function TreeWithLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [initialDropComplete, setInitialDropComplete] = useState(false);


  // Generate falling leaves on page load
  useEffect(() => {
    const generateFallingLeaves = () => {
      const autumnColors = [
        "#FF6B35", "#FF8C42", "#FFC14F", "#FFE66D", "#D32F2F", "#FF5722", 
        "#FF9800", "#FFC107", "#8BC34A", "#4CAF50", "#2E7D32", "#689F38", 
        "#827717", "#F57C00", "#E65100", "#BF360C", "#CD853F", "#D2691E", 
        "#DEB887", "#F4A460", "#DAA520", "#B8860B", "#A0522D", "#8B4513"
      ];

      // Generate large initial batch of falling leaves
      const fallingLeaves: Leaf[] = [];
      
      // Create 440 initial leaves for dramatic opening effect
      for (let i = 0; i < 440; i++) {
        fallingLeaves.push({
          id: i,
          x: Math.random() * 100, // Random X position across screen
          y: -10 - (Math.random() * 100), // Spread initial leaves across larger area for dramatic effect
          rotation: Math.random() * 360,
          scale: 0.7 + Math.random() * 0.6,
          color: autumnColors[Math.floor(Math.random() * autumnColors.length)],
          velocityX: (Math.random() - 0.5) * 0.001, // Slower horizontal drift
          velocityY: Math.random() * 0.01 + 0.001, // Much slower falling speed
          rotationSpeed: (Math.random() - 0.5) * 2, // Slower rotation
          opacity: 1,
          swingPhase: Math.random() * Math.PI * 2,
          lifeTime: 999999, // Long lifeTime so they don't disappear
          isAttached: false, // All leaves are falling
          attachedBranchId: undefined,
          attachmentX: undefined,
          attachmentY: undefined,
          swayAmplitude: 0.5 + Math.random() * 1.0,
          detachmentChance: 0,
          shouldStayAttached: false
        });
      }

      setLeaves(fallingLeaves);
    };

    // Generate leaves immediately on page load
    generateFallingLeaves();
    
    // Mark initial drop as complete after leaves have had time to fall
    const timer = setTimeout(() => {
      setInitialDropComplete(true);
    }, 18000); // 18 seconds for initial leaves to mostly settle
    
    return () => clearTimeout(timer);
  }, []);


  // Leaf physics animation
  useEffect(() => {

    let animationId: number;
    let lastTime = performance.now();
    let leafGenerationTimer = 0;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;
      leafGenerationTimer += deltaTime;

      // Generate new falling leaves at different rates based on initial drop status
      const generationInterval = initialDropComplete ? 600 : 180; // Much slower after initial drop (10 seconds vs 3 seconds)
      const shouldGenerate = initialDropComplete ? Math.random() < 0.3 : true; // Only 30% chance after initial drop
      
      if (leafGenerationTimer > generationInterval && shouldGenerate) {
        const autumnColors = [
          "#FF6B35", "#FF8C42", "#FFC14F", "#FFE66D", "#D32F2F", "#FF5722", 
          "#FF9800", "#FFC107", "#8BC34A", "#4CAF50", "#2E7D32", "#689F38", 
          "#827717", "#F57C00", "#E65100", "#BF360C", "#CD853F", "#D2691E", 
          "#DEB887", "#F4A460", "#DAA520", "#B8860B", "#A0522D", "#8B4513"
        ];
        
        const newLeaf: Leaf = {
          id: Date.now() + Math.random(), // Unique ID
          x: Math.random() * 100, // Random X position across screen
          y: -10, // Start above screen
          rotation: Math.random() * 360,
          scale: 0.7 + Math.random() * 0.6,
          color: autumnColors[Math.floor(Math.random() * autumnColors.length)],
          velocityX: (Math.random() - 0.5) * 0.02, // Slower horizontal drift
          velocityY: Math.random() * 0.1 + 0.02, // Much slower falling speed
          rotationSpeed: (Math.random() - 0.5) * 2, // Slower rotation
          opacity: 1,
          swingPhase: Math.random() * Math.PI * 2,
          lifeTime: 999999, // Long lifeTime so they don't disappear
          isAttached: false,
          attachedBranchId: undefined,
          attachmentX: undefined,
          attachmentY: undefined,
          swayAmplitude: 0.5 + Math.random() * 1.0,
          detachmentChance: 0,
          shouldStayAttached: false
        };
        
        // After initial drop, sometimes generate 2-3 leaves at once for occasional clusters
        const leavesToAdd = initialDropComplete && Math.random() < 0.2 ? 
          Array.from({ length: Math.floor(Math.random() * 2) + 2 }, (_, index) => ({
            ...newLeaf,
            id: newLeaf.id + index,
            x: Math.max(0, Math.min(100, newLeaf.x + (Math.random() - 0.5) * 15)), // Cluster near original position
            y: newLeaf.y - Math.random() * 20,
            velocityX: newLeaf.velocityX + (Math.random() - 0.5) * 0.1
          })) : [newLeaf];
        
        setLeaves(prevLeaves => [...prevLeaves, ...leavesToAdd]);
        leafGenerationTimer = 0;
      }

      setLeaves(prevLeaves =>
        prevLeaves
          .map(leaf => {
            let newLeaf = { ...leaf };
            
            // All leaves are falling - no attached state
            const windForce = Math.sin(currentTime / 15000 + leaf.swingPhase) * 0.08;
            const gustEffect = Math.sin(currentTime / 8000 + leaf.id * 0.1) * 0.04;
            const airResistance = 0.996;
            
            let newVelX = leaf.velocityX * airResistance + windForce + gustEffect;
            let newVelY = leaf.velocityY + 0.008; // Reduced gravity for slower fall
            
            // Add gentle turbulence for realistic movement
            newVelX += (Math.random() - 0.5) * 0.02;
            newVelY += (Math.random() - 0.5) * 0.01;
            
            // Gentle spiral drift
            const spiralForce = Math.sin(currentTime / 12000 + leaf.id * 0.3) * 0.03;
            newVelX += spiralForce;
            
            newLeaf.x = leaf.x + newVelX * deltaTime;
            newLeaf.y = leaf.y + newVelY * deltaTime;
            newLeaf.velocityX = newVelX;
            newLeaf.velocityY = newVelY;
            newLeaf.rotation = leaf.rotation + leaf.rotationSpeed * deltaTime * 0.08;
            
            // Fade out leaves as they reach the bottom of the screen
            if (newLeaf.y > 95) {
              newLeaf.opacity = Math.max(0, leaf.opacity - 0.04 * deltaTime);
            }
            
            // Also fade out leaves that go off the sides
            if (newLeaf.x < -10 || newLeaf.x > 110) {
              newLeaf.opacity = Math.max(0, leaf.opacity - 0.03 * deltaTime);
            }

            return newLeaf;
          })
          .filter(leaf => leaf.opacity > 0.05 && leaf.y < 110 && leaf.x > -15 && leaf.x < 115)
      );
      
      // No tree removal logic needed

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);


  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">

      {/* Generate falling leaves from top of screen */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute leaf-element"
          style={{
            left: `${leaf.x}vw`,
            top: `${leaf.y}vh`,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            opacity: leaf.opacity,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
              filter: `brightness(${0.9 + Math.sin(Date.now() / 5000 + leaf.id) * 0.08}) drop-shadow(1px 2px 3px rgba(0,0,0,0.15))`,
            }}
          >
            {/* More realistic maple-like leaf shape */}
            <path
              d="M9 1.5C8.2 2.1 7.1 3.2 6.5 4.5L4.8 4.8C3.9 5.2 3.2 6.1 2.8 7.1C2.5 8.2 2.6 9.4 3.2 10.4L4.2 11.8C4.6 12.5 4.8 13.3 4.7 14.1C4.6 14.8 4.8 15.5 5.3 16.1L6.8 17.8C7.4 18.5 8.2 18.9 9 18.9C9.8 18.9 10.6 18.5 11.2 17.8L12.7 16.1C13.2 15.5 13.4 14.8 13.3 14.1C13.2 13.3 13.4 12.5 13.8 11.8L14.8 10.4C15.4 9.4 15.5 8.2 15.2 7.1C14.8 6.1 14.1 5.2 13.2 4.8L11.5 4.5C10.9 3.2 9.8 2.1 9 1.5Z"
              fill={leaf.color}
              opacity={0.92}
            />
            {/* Realistic leaf veins - main midrib */}
            <path
              d="M9 2L9 18.5"
              stroke="#2D5016"
              strokeWidth="0.8"
              opacity={0.4}
            />
            {/* Secondary veins */}
            <path
              d="M9 6L6.5 8.5M9 6L11.5 8.5M9 10L6 12.5M9 10L12 12.5M9 14L7 16M9 14L11 16"
              stroke="#2D5016"
              strokeWidth="0.4"
              opacity={0.3}
            />
            {/* Leaf petiole (stem) */}
            <line
              x1="9"
              y1="18.5"
              x2="9"
              y2="20.5"
              stroke="#3A2F1A"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Subtle leaf edge serration */}
            <path
              d="M4.8 4.8L4.5 5.2L4.8 5.6M13.2 4.8L13.5 5.2L13.2 5.6M4.2 11.8L3.8 12.2L4.2 12.6M14.8 10.4L15.2 10.8L14.8 11.2"
              stroke={leaf.color}
              strokeWidth="0.3"
              opacity={0.6}
              fill="none"
            />
          </svg>
        </div>
      ))}

      {/* CSS for leaf animations */}
      <style jsx>{`
        @keyframes leaf-sway {
          0% { transform: translateX(-1px) translateY(-0.5px) rotate(-2deg); }
          12.5% { transform: translateX(0.8px) translateY(0.4px) rotate(1.5deg); }
          25% { transform: translateX(1.2px) translateY(-0.3px) rotate(2.2deg); }
          37.5% { transform: translateX(-0.6px) translateY(0.6px) rotate(-1deg); }
          50% { transform: translateX(-1.5px) translateY(0.3px) rotate(-2.5deg); }
          62.5% { transform: translateX(0.5px) translateY(-0.4px) rotate(1.8deg); }
          75% { transform: translateX(1.8px) translateY(0.8px) rotate(3deg); }
          87.5% { transform: translateX(-0.3px) translateY(-0.6px) rotate(-1.2deg); }
          100% { transform: translateX(-1px) translateY(-0.5px) rotate(-2deg); }
        }
        
        @keyframes leaf-gentle-sway {
          0% { transform: translateX(-0.5px) translateY(-0.3px) rotate(-1deg); }
          33% { transform: translateX(0.4px) translateY(0.2px) rotate(0.8deg); }
          66% { transform: translateX(0.6px) translateY(-0.15px) rotate(1.2deg); }
          100% { transform: translateX(-0.5px) translateY(-0.3px) rotate(-1deg); }
        }
        
        .leaf-element {
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform-origin: center bottom;
        }
        
        .branch-leaf-animation {
          will-change: transform;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}