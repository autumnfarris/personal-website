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
}

interface TreeBranch {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  growth: number;
  level: number;
  parentAngle: number;
}

export default function TreeWithLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [treeGrowth, setTreeGrowth] = useState(0);
  const [isTreeFullyGrown, setIsTreeFullyGrown] = useState(false);

  // Generate tree structure using recursive branching
  const treeStructure = useMemo(() => {
    const branches: TreeBranch[] = [];
    let branchId = 0;

    const createBranch = (
      x1: number, y1: number, 
      angle: number, length: number, 
      width: number, level: number,
      parentAngle: number
    ) => {
      if (level > 3 || length < 15) return;

      const x2 = x1 + Math.cos(angle) * length;
      const y2 = y1 + Math.sin(angle) * length;

      branches.push({
        id: branchId++,
        x1, y1, x2, y2,
        width: Math.max(1, width),
        growth: 0,
        level,
        parentAngle: angle
      });

      // Create child branches immediately (no setTimeout)
      if (level < 3) {
        const branchCount = level === 0 ? 3 : 2;
        for (let i = 0; i < branchCount; i++) {
          const angleVariation = level === 0 ? 0.5 : 0.8;
          const newAngle = angle + (i - 1) * angleVariation + (Math.random() - 0.5) * 0.3;
          const newLength = length * (0.7 + Math.random() * 0.1);
          const newWidth = width * 0.6;
          
          createBranch(x2, y2, newAngle, newLength, newWidth, level + 1, angle);
        }
      }
    };

    // Create main trunk
    createBranch(50, 120, -Math.PI/2, 50, 6, 0, -Math.PI/2);
    
    return branches;
  }, []);

  // Tree growth animation
  useEffect(() => {
    const growTree = () => {
      setTreeGrowth(prev => {
        const newGrowth = Math.min(prev + 0.015, 1); // Better paced growth
        if (newGrowth >= 1 && !isTreeFullyGrown) {
          setIsTreeFullyGrown(true);
          // Start leaf generation after tree is grown
          setTimeout(() => {
            generateInitialLeaves();
          }, 1500); // Longer delay before leaves appear
        }
        return newGrowth;
      });
    };

    const interval = setInterval(growTree, 60); // Better interval
    return () => clearInterval(interval);
  }, [isTreeFullyGrown]);

  const generateInitialLeaves = () => {
    const autumnColors = [
      "#E6A74C", "#BB482D", "#CDAD5D", 
      "#74480F", "#D4662F", "#8B4513",
      "#DAA520", "#CD853F", "#FF6347"
    ];

    // Generate leaves from branch endpoints - convert SVG coords to viewport coords
    const branchLeaves: Leaf[] = [];
    
    treeStructure.forEach((branch, index) => {
      if (branch.level >= 2) { // Only generate leaves on smaller branches
        for (let i = 0; i < 2; i++) {
          // Convert SVG coordinates to viewport coordinates
          const leafX = 85 + (branch.x2 - 50) * 0.5; // Scale and position
          const leafY = 100 - (120 - branch.y2) * 0.8; // Flip Y and scale
          
          branchLeaves.push({
            id: index * 10 + i,
            x: leafX + (Math.random() - 0.5) * 5,
            y: leafY + (Math.random() - 0.5) * 3,
            rotation: Math.random() * 360,
            scale: 0.8 + Math.random() * 0.4,
            color: autumnColors[Math.floor(Math.random() * autumnColors.length)],
            velocityX: (Math.random() - 0.5) * 0.03,
            velocityY: Math.random() * 0.02 + 0.01,
            rotationSpeed: (Math.random() - 0.5) * 3,
            opacity: 1,
            swingPhase: Math.random() * Math.PI * 2,
            lifeTime: Math.random() * 4000 + 5000
          });
        }
      }
    });

    setLeaves(branchLeaves);
  };

  // Leaf physics animation
  useEffect(() => {
    if (!isTreeFullyGrown) return;

    let animationId: number;
    let lastTime = performance.now();
    let leafGenerationTimer = 0;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;
      leafGenerationTimer += deltaTime;

      // Generate new leaves periodically - much slower
      if (leafGenerationTimer > 300 && Math.random() > 0.98) {
        leafGenerationTimer = 0;
        const colors = ["#E6A74C", "#BB482D", "#CDAD5D", "#74480F", "#D4662F"];
        const eligibleBranches = treeStructure.filter(branch => branch.level >= 2);
        
        if (eligibleBranches.length > 0) {
          const sourceBranch = eligibleBranches[Math.floor(Math.random() * eligibleBranches.length)];
          const leafX = 85 + (sourceBranch.x2 - 50) * 0.5;
          const leafY = 100 - (120 - sourceBranch.y2) * 0.8;
          
          setLeaves(prev => [...prev, {
            id: Date.now() + Math.random(),
            x: leafX + (Math.random() - 0.5) * 3,
            y: leafY + (Math.random() - 0.5) * 2,
            rotation: Math.random() * 360,
            scale: 0.6 + Math.random() * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocityX: (Math.random() - 0.5) * 0.03,
            velocityY: Math.random() * 0.02 + 0.01,
            rotationSpeed: (Math.random() - 0.5) * 3,
            opacity: 1,
            swingPhase: Math.random() * Math.PI * 2,
            lifeTime: Math.random() * 4000 + 5000
          }]);
        }
      }

      setLeaves(prevLeaves =>
        prevLeaves
          .map(leaf => {
            // Wind effect - extremely gentle
            const windForce = Math.sin(currentTime / 8000 + leaf.swingPhase) * 0.005;
            
            // Air resistance
            const airResistance = 0.998;
            
            // Update physics - very slow
            let newVelX = leaf.velocityX * airResistance + windForce;
            let newVelY = leaf.velocityY + 0.0008; // Very weak gravity
            
            // Add extremely subtle turbulence
            newVelX += (Math.random() - 0.5) * 0.001;
            newVelY += (Math.random() - 0.5) * 0.0005;
            
            const newX = leaf.x + newVelX * deltaTime;
            const newY = leaf.y + newVelY * deltaTime;
            const newRotation = leaf.rotation + leaf.rotationSpeed * deltaTime * 0.1; // Much slower rotation
            const newLifeTime = leaf.lifeTime - deltaTime * 16.67;
            
            // Fade out as leaf ages or goes off screen
            let newOpacity = leaf.opacity;
            if (newY > 100 || newX < -10 || newX > 110 || newLifeTime < 1000) {
              newOpacity = Math.max(0, newOpacity - 0.02 * deltaTime);
            }

            return {
              ...leaf,
              x: newX,
              y: newY,
              velocityX: newVelX,
              velocityY: newVelY,
              rotation: newRotation,
              opacity: newOpacity,
              lifeTime: newLifeTime
            };
          })
          .filter(leaf => leaf.opacity > 0.05 && leaf.y < 110 && leaf.x > -15 && leaf.x < 115)
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isTreeFullyGrown, treeStructure]);

  const getVisibleBranches = () => {
    return treeStructure.filter((_, index) => index / treeStructure.length <= treeGrowth);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Tree SVG */}
      <svg 
        className="absolute bottom-0 right-8"
        width="300" 
        height="500" 
        viewBox="0 0 100 120"
        style={{ 
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
          opacity: Math.min(1, treeGrowth * 2)
        }}
      >
        {/* Tree trunk and branches */}
        {getVisibleBranches().map((branch) => (
          <line
            key={branch.id}
            x1={branch.x1}
            y1={branch.y1}
            x2={branch.x1 + (branch.x2 - branch.x1) * Math.min(1, (treeGrowth * treeStructure.length - treeStructure.indexOf(branch)) / 5)}
            y2={branch.y1 + (branch.y2 - branch.y1) * Math.min(1, (treeGrowth * treeStructure.length - treeStructure.indexOf(branch)) / 5)}
            stroke="#8B4513"
            strokeWidth={branch.width * (1 + Math.sin(Date.now() / 1000) * 0.1)}
            strokeLinecap="round"
            style={{
              filter: `hue-rotate(${Math.sin(Date.now() / 2000) * 10}deg)`,
            }}
          />
        ))}
        
        {/* Tree leaves on branches (before they fall) */}
        {isTreeFullyGrown && treeStructure.map((branch) => {
          if (branch.level < 3) return null;
          return Array.from({ length: Math.floor(Math.random() * 2 + 1) }).map((_, i) => (
            <circle
              key={`branch-leaf-${branch.id}-${i}`}
              cx={branch.x2 + (Math.random() - 0.5) * 4}
              cy={branch.y2 + (Math.random() - 0.5) * 2}
              r={1.5 + Math.random() * 0.5}
              fill={["#E6A74C", "#BB482D", "#CDAD5D"][Math.floor(Math.random() * 3)]}
              opacity={0.8}
              style={{
                animation: `leaf-sway ${12 + Math.random() * 60}s ease-in-out infinite alternate`,
              }}
            />
          ));
        })}
      </svg>

      {/* Falling leaves */}
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
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C7.9 4.1 5 8.4 5 13.5C5 15.8 5.9 17.8 7.3 19.2C7.5 19.4 7.7 19.6 8 19.8C8.7 20.2 9.5 20.6 10.4 20.8C11 21 11.6 21 12.3 21C12.9 21 13.5 20.9 14.1 20.8C14.9 20.6 15.6 20.3 16.2 19.8C16.4 19.6 16.7 19.4 16.9 19.2C18.1 17.9 19 15.9 19 13.5C19 8.4 16.2 4.1 12 2Z"
              fill={leaf.color}
              style={{
                filter: `brightness(${0.9 + Math.sin(Date.now() / 1000 + leaf.id) * 0.1})`,
              }}
            />
          </svg>
        </div>
      ))}

      {/* CSS for leaf sway animation */}
      <style jsx>{`
        @keyframes leaf-sway {
          0% { transform: translateX(-0.2px) rotate(-0.3deg); }
          100% { transform: translateX(0.2px) rotate(0.3deg); }
        }
      `}</style>
    </div>
  );
}