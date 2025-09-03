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
  curvature: number;
  controlX: number;
  controlY: number;
}

export default function TreeWithLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [treeGrowth, setTreeGrowth] = useState(0);
  const [isTreeFullyGrown, setIsTreeFullyGrown] = useState(false);

  // Deterministic pseudo-random function for consistent tree generation
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Generate tree structure using recursive branching
  const treeStructure = useMemo(() => {
    const branches: TreeBranch[] = [];
    let branchId = 0;

    const createBranch = (
      x1: number, y1: number, 
      angle: number, length: number, 
      width: number, level: number,
      parentAngle: number,
      seed: number
    ) => {
      if (level > 4 || length < 10) return;

      const x2 = x1 + Math.cos(angle) * length;
      const y2 = y1 + Math.sin(angle) * length;

      // Add natural curvature to branches using seeded randomness
      const curvature = (seededRandom(seed * 1.1) - 0.5) * 0.3;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const perpAngle = angle + Math.PI / 2;
      const controlX = midX + Math.cos(perpAngle) * length * curvature;
      const controlY = midY + Math.sin(perpAngle) * length * curvature;

      branches.push({
        id: branchId++,
        x1, y1, x2, y2,
        width: Math.max(0.5, width),
        growth: 0,
        level,
        parentAngle: angle,
        curvature,
        controlX,
        controlY
      });

      // Create child branches with more realistic pattern
      if (level < 4) {
        let branchCount;
        let angleVariation;
        
        if (level === 0) {
          // Main trunk splits into 2-3 major branches
          branchCount = 2 + Math.floor(seededRandom(seed * 1.2) * 2);
          angleVariation = 0.4;
        } else if (level === 1) {
          // Major branches split into 2-3 medium branches
          branchCount = 2 + Math.floor(seededRandom(seed * 1.3) * 2);
          angleVariation = 0.6;
        } else {
          // Smaller branches split into 1-2 twigs
          branchCount = 1 + Math.floor(seededRandom(seed * 1.4) * 2);
          angleVariation = 0.8;
        }
        
        for (let i = 0; i < branchCount; i++) {
          const baseAngleOffset = (i - (branchCount - 1) / 2) * angleVariation;
          const randomOffset = (seededRandom(seed * 1.5 + i * 0.3) - 0.5) * 0.4;
          const newAngle = angle + baseAngleOffset + randomOffset;
          
          const lengthReduction = 0.65 + seededRandom(seed * 1.6 + i * 0.4) * 0.2;
          const newLength = length * lengthReduction;
          const newWidth = width * (0.65 + seededRandom(seed * 1.7 + i * 0.5) * 0.1);
          
          createBranch(x2, y2, newAngle, newLength, newWidth, level + 1, angle, seed * 2 + i);
        }
      }
    };

    // Create main trunk with deterministic seed
    createBranch(50, 120, -Math.PI/2, 50, 6, 0, -Math.PI/2, 12345);
    
    return branches;
  }, []);

  // Tree growth animation
  useEffect(() => {
    const generateInitialLeaves = () => {
      const autumnColors = [
        "#CD853F", "#D2691E", "#DEB887", "#F4A460", "#DAA520", 
        "#B8860B", "#BC8F8F", "#D2B48C", "#F5DEB3", "#FFE4B5",
        "#8B4513", "#A0522D", "#CD5C5C", "#DC143C", "#B22222",
        "#228B22", "#32CD32", "#9ACD32", "#6B8E23", "#556B2F"
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
              lifeTime: Math.random() * 8000 + 10000,
              isAttached: true,
              attachedBranchId: branch.id,
              attachmentX: branch.x2,
              attachmentY: branch.y2,
              swayAmplitude: 0.5 + Math.random() * 1.5,
              detachmentChance: 0.00005 + Math.random() * 0.00008
            });
          }
        }
      });

      setLeaves(branchLeaves);
    };

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
  }, [isTreeFullyGrown, treeStructure]);


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

      // Disable new leaf generation to prevent regeneration during page load
      // Only the initial leaves from generateInitialLeaves() will be used

      setLeaves(prevLeaves =>
        prevLeaves
          .map(leaf => {
            let newLeaf = { ...leaf };
            
            if (leaf.isAttached) {
              // Attached leaves sway gently in the wind
              const primaryWind = Math.sin(currentTime / 12000 + leaf.swingPhase) * leaf.swayAmplitude * 0.15;
              const secondaryWind = Math.sin(currentTime / 8000 + leaf.swingPhase * 0.7) * 0.08;
              const gustEffect = Math.sin(currentTime / 20000 + leaf.swingPhase * 1.3) * 0.05;
              
              // Convert attachment coordinates to viewport
              const baseX = 85 + (leaf.attachmentX! - 50) * 0.5;
              const baseY = 100 - (120 - leaf.attachmentY!) * 0.8;
              
              newLeaf.x = baseX + primaryWind + secondaryWind + gustEffect + (Math.random() - 0.5) * 0.02;
              newLeaf.y = baseY + Math.sin(currentTime / 15000 + leaf.swingPhase) * 0.06 + 
                         Math.cos(currentTime / 18000 + leaf.swingPhase * 0.8) * 0.03;
              newLeaf.rotation = leaf.rotation + primaryWind * 1.2 + secondaryWind * 0.8 + gustEffect * 2;
              
              // Check for detachment - much higher chance
              if (Math.random() < leaf.detachmentChance * deltaTime * 100) {
                newLeaf.isAttached = false;
                newLeaf.velocityX = (Math.random() - 0.5) * 0.5 + primaryWind * 0.2;
                newLeaf.velocityY = Math.random() * 0.3 + 0.1;
                newLeaf.rotationSpeed = (Math.random() - 0.5) * 8;
                // Start from current position
                newLeaf.x = baseX + primaryWind + secondaryWind + gustEffect;
                newLeaf.y = baseY;
              }
              
              newLeaf.lifeTime = leaf.lifeTime - deltaTime * 16.67;
            } else {
              // Detached leaves fall even slower with very gentle physics
              const windForce = Math.sin(currentTime / 30000 + leaf.swingPhase) * 0.04;
              const gustEffect = Math.sin(currentTime / 18000) * 0.03;
              const airResistance = 0.999;
              
              let newVelX = leaf.velocityX * airResistance + windForce + gustEffect;
              let newVelY = leaf.velocityY + 0.004; // Even gentler gravity
              
              // Add very minimal turbulence
              newVelX += (Math.random() - 0.5) * 0.01;
              newVelY += (Math.random() - 0.5) * 0.005;
              
              // Very gentle spiral drift
              const spiralForce = Math.sin(currentTime / 15000 + leaf.id) * 0.025;
              newVelX += spiralForce;
              
              newLeaf.x = leaf.x + newVelX * deltaTime;
              newLeaf.y = leaf.y + newVelY * deltaTime;
              newLeaf.velocityX = newVelX;
              newLeaf.velocityY = newVelY;
              newLeaf.rotation = leaf.rotation + leaf.rotationSpeed * deltaTime * 0.08;
              newLeaf.lifeTime = leaf.lifeTime - deltaTime * 16.67;
            }
            
            // Fade out as leaf ages or goes off screen
            if (newLeaf.y > 100 || newLeaf.x < -10 || newLeaf.x > 110 || newLeaf.lifeTime < 2000) {
              newLeaf.opacity = Math.max(0, leaf.opacity - 0.015 * deltaTime);
            }

            return newLeaf;
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

  // Calculate tree bounds to prevent clipping
  const getTreeBounds = () => {
    if (treeStructure.length === 0) return { minX: 0, maxX: 100, minY: 0, maxY: 120 };
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    treeStructure.forEach(branch => {
      minX = Math.min(minX, branch.x1, branch.x2, branch.controlX);
      maxX = Math.max(maxX, branch.x1, branch.x2, branch.controlX);
      minY = Math.min(minY, branch.y1, branch.y2, branch.controlY);
      maxY = Math.max(maxY, branch.y1, branch.y2, branch.controlY);
    });
    
    // Add padding for leaves and branch width
    const padding = 15;
    return {
      minX: minX - padding,
      maxX: maxX + padding,
      minY: minY - padding,
      maxY: maxY + padding
    };
  };

  const treeBounds = getTreeBounds();
  const treeWidth = treeBounds.maxX - treeBounds.minX;
  const treeHeight = treeBounds.maxY - treeBounds.minY;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      {/* Tree SVG - positioned to show full tree without clipping */}
      <div className="absolute w-full h-full flex items-end justify-end pr-8">
        <svg 
          width={Math.max(300, treeWidth * 4)} 
          height={Math.max(500, treeHeight * 4)} 
          viewBox={`${treeBounds.minX} ${treeBounds.minY} ${treeWidth} ${treeHeight}`}
          style={{ 
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
            opacity: Math.min(1, treeGrowth * 2),
            maxWidth: 'none',
            maxHeight: 'none'
          }}
          preserveAspectRatio="xMidYMax meet"
        >
        {/* Tree trunk and branches with organic curves */}
        {getVisibleBranches().map((branch, index) => {
          const growthProgress = Math.min(1, (treeGrowth * treeStructure.length - index) / 8);
          const currentX2 = branch.x1 + (branch.x2 - branch.x1) * growthProgress;
          const currentY2 = branch.y1 + (branch.y2 - branch.y1) * growthProgress;
          const currentControlX = branch.x1 + (branch.controlX - branch.x1) * growthProgress;
          const currentControlY = branch.y1 + (branch.controlY - branch.y1) * growthProgress;
          
          // More realistic bark colors with variation
          const trunkColor = branch.level === 0 ? "#3C2F24" : 
                            branch.level === 1 ? "#4A3A2B" : 
                            branch.level === 2 ? "#5C4A36" : 
                            branch.level === 3 ? "#6B5A45" : "#7A6A55";
          
          // Create curved path
          const pathData = `M ${branch.x1} ${branch.y1} Q ${currentControlX} ${currentControlY} ${currentX2} ${currentY2}`;
          
          return (
            <g key={branch.id}>
              {/* Main curved branch */}
              <path
                d={pathData}
                stroke={trunkColor}
                strokeWidth={branch.width * (1 + Math.sin(index * 0.3) * 0.1)}
                strokeLinecap="round"
                fill="none"
                opacity={0.95}
                style={{
                  filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))'
                }}
              />
              {/* Enhanced organic bark texture */}
              {branch.level <= 2 && growthProgress > 0.3 && (
                <>
                  {/* Primary bark lines */}
                  <path
                    d={`M ${branch.x1 + (currentX2 - branch.x1) * 0.15} ${branch.y1 + (currentY2 - branch.y1) * 0.15} Q ${currentControlX * 0.98} ${currentControlY * 0.98} ${currentX2 * 0.99} ${currentY2 * 0.99}`}
                    stroke="#2A1E15"
                    strokeWidth={branch.width * 0.2}
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.5}
                  />
                  <path
                    d={`M ${branch.x1 + (currentX2 - branch.x1) * 0.7} ${branch.y1 + (currentY2 - branch.y1) * 0.7} Q ${currentControlX * 1.02} ${currentControlY * 1.02} ${currentX2 * 1.01} ${currentY2 * 1.01}`}
                    stroke="#251A12"
                    strokeWidth={branch.width * 0.12}
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.35}
                  />
                  {/* Secondary bark texture for main trunk */}
                  {branch.level === 0 && (
                    <>
                      <path
                        d={`M ${branch.x1 + (currentX2 - branch.x1) * 0.4} ${branch.y1 + (currentY2 - branch.y1) * 0.4} Q ${currentControlX * 0.96} ${currentControlY * 0.96} ${currentX2 * 0.97} ${currentY2 * 0.97}`}
                        stroke="#1F1611"
                        strokeWidth={branch.width * 0.08}
                        strokeLinecap="round"
                        fill="none"
                        opacity={0.25}
                      />
                      <path
                        d={`M ${branch.x1 + (currentX2 - branch.x1) * 0.85} ${branch.y1 + (currentY2 - branch.y1) * 0.85} Q ${currentControlX * 1.04} ${currentControlY * 1.04} ${currentX2 * 1.03} ${currentY2 * 1.03}`}
                        stroke="#332519"
                        strokeWidth={branch.width * 0.06}
                        strokeLinecap="round"
                        fill="none"
                        opacity={0.2}
                      />
                    </>
                  )}
                </>
              )}
            </g>
          );
        })}
        
				{/* Tree leaves hanging from branches - realistic hanging leaf shapes */}
				{isTreeFullyGrown && treeStructure.map((branch) => {
					if (branch.level < 2) return null;
					// Generate more leaves with varied counts based on branch level using deterministic functions
					const leafCount = branch.level === 2 ? 2 + Math.floor(Math.abs(Math.sin(branch.id)) * 2 + 2) : 
					                 branch.level === 3 ? 3 + Math.floor(Math.abs(Math.cos(branch.id)) * 2 + 2) : 
					                 4 + Math.floor(Math.abs(Math.sin(branch.id * 1.3)) * 2 + 2);
					const autumnColors = [
						"#CD853F", "#D2691E", "#DEB887", "#F4A460", "#8B4513", "#A0522D", "#228B22", "#556B2F"
					];
					return Array.from({ length: leafCount }).map((_, i) => {
						const leafColor = autumnColors[(branch.id + i) % autumnColors.length];
						
						// Position leaves with much more natural variation
						const branchEndX = branch.x2;
						const branchEndY = branch.y2;
						
						// Create downward-facing stem directions within 90 to 300 degrees
						// to ensure leaves hang naturally downwards
						const minAngle = 90 * Math.PI / 180; 
						const maxAngle = -60 * Math.PI / 180; 
						const angleRange = maxAngle - minAngle; // 140 degrees total range
						const stemAngle = minAngle + Math.abs(Math.sin(branch.id + i * 2.1)) * angleRange; // Between 200 and 340 degrees
						const stemLength = 0.8 + Math.sin(branch.id + i * 1.4) * 0.6; // Shorter, varied stem lengths
						
						// Calculate stem end position (where leaf attaches)
						const stemEndX = branchEndX + Math.cos(stemAngle) * stemLength;
						const stemEndY = branchEndY + Math.sin(stemAngle) * stemLength;
						
						// Leaf rotation follows stem direction with natural variation, staying within downward range
						const baseRotation = stemAngle * 180 / Math.PI; // Convert stem angle to degrees
						const naturalVariation = Math.sin(branch.id + i * 1.7) * 10 + Math.cos(branch.id + i * 0.9) * 8;
						let leafRotation = baseRotation + naturalVariation;
						
						// Ensure leaf rotation stays within valid range (200-340 degrees)
						if (leafRotation < 200) leafRotation += 360;
						if (leafRotation > 340) leafRotation -= 360;
						
						return (
							<g 
								key={`branch-leaf-${branch.id}-${i}`}
								className="branch-leaf-animation"
								style={{
									animation: `${Math.sin(branch.id + i) > 0 ? 'leaf-sway' : 'leaf-gentle-sway'} ${8 + (branch.id + i) % 12}s ease-in-out infinite`,
									animationDelay: `${(branch.id + i) % 6}s`,
									transformOrigin: `${branchEndX}px ${branchEndY}px`,
								}}
							>
								{/* Petiole (leaf stem) connecting branch to leaf attachment point */}
								<line
									x1={branchEndX}
									y1={branchEndY}
									x2={stemEndX}
									y2={stemEndY}
									stroke="#3A2F1A"
									strokeWidth="0.5"
									strokeLinecap="round"
									opacity={0.8}
								/>
								
								{/* Leaf attached at stem end - positioned so stem attachment is at origin */}
								<g transform={`translate(${stemEndX}, ${stemEndY}) rotate(${leafRotation})`}>
									{/* Realistic maple-like leaf shape with stem attachment at origin */}
									<path
										d={`M0 1C-1.2 1.8 -2.1 3.1 -2.4 4.4L-3.3 4.6C-4 4.9 -4.5 5.6 -4.7 6.4C-4.8 7.3 -4.7 8.2 -4.2 9L-3.5 10.1C-3.2 10.6 -3.1 11.2 -3.2 11.8C-3.3 12.3 -3.1 12.8 -2.7 13.2L-1.7 14.4C-1.2 14.9 -0.6 15.2 0 15.2C0.6 15.2 1.2 14.9 1.7 14.4L2.7 13.2C3.1 12.8 3.3 12.3 3.2 11.8C3.1 11.2 3.2 10.6 3.5 10.1L4.2 9C4.7 8.2 4.8 7.3 4.7 6.4C4.5 5.6 4 4.9 3.3 4.6L2.4 4.4C2.1 3.1 1.2 1.8 0 1Z`}
										fill={leafColor}
										opacity={0.88 + Math.sin(branch.id + i) * 0.1}
										transform={`scale(${0.6 + Math.cos(branch.id + i * 1.3) * 0.2 + Math.sin(branch.id + i * 0.7) * 0.15})`}
									/>
									{/* Main vein from stem attachment through leaf */}
									<line
										x1="0"
										y1="1"
										x2="0"
										y2="9"
										stroke="#2D5016"
										strokeWidth=".4"
										opacity={0.5}
									/>
									<path
										d="M0 3L-1 5.5M0 3L1 5.5M0 6L-1.2 8.5M0 6L1.2 8.5"
										stroke="#2D5016"
										strokeWidth=".25"
										opacity={0.4}
									/>
									{/* Visible petiole extension into leaf */}
									<line
										x1="0"
										y1="0"
										x2="0"
										y2="2"
										stroke="#3A2F1A"
										strokeWidth="0.3"
										strokeLinecap="round"
										opacity={0.7}
									/>
								</g>
							</g>
						);
					});
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

      {/* CSS for enhanced leaf animations */}
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
    </div>
  );
}