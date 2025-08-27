// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match its display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Game elements
    const rabbit = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 30,
      speed: 5,
      direction: { x: 0, y: 0 }
    };

    const squirrel = {
      x: 50,
      y: 50,
      size: 25,
      speed: 3
    };

    const acorns: { x: number; y: number }[] = [];
    const acornSize = 15;
    const maxAcorns = 5;

    // Add initial acorns
    for (let i = 0; i < maxAcorns; i++) {
      acorns.push({
        x: Math.random() * (canvas.width - acornSize * 2) + acornSize,
        y: Math.random() * (canvas.height - acornSize * 2) + acornSize
      });
    }

    // Game loop variables
    let animationId: number;
    let lastTime = 0;
    
    // Handle keyboard controls
    const keys: { [key: string]: boolean } = {};
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Game loop
    function gameLoop(timestamp: number) {
      // Calculate delta time for smooth animation
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw autumn-themed background
      ctx.fillStyle = "#FFF8F0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw some fallen leaves in the background
      drawFallenLeaves(ctx, canvas);

      // Update rabbit position based on key presses
      rabbit.direction = { x: 0, y: 0 };
      if (keys["ArrowUp"] || keys["w"]) rabbit.direction.y = -1;
      if (keys["ArrowDown"] || keys["s"]) rabbit.direction.y = 1;
      if (keys["ArrowLeft"] || keys["a"]) rabbit.direction.x = -1;
      if (keys["ArrowRight"] || keys["d"]) rabbit.direction.x = 1;
      
      // Normalize diagonal movement
      if (rabbit.direction.x !== 0 && rabbit.direction.y !== 0) {
        const length = Math.sqrt(rabbit.direction.x ** 2 + rabbit.direction.y ** 2);
        rabbit.direction.x /= length;
        rabbit.direction.y /= length;
      }
      
      rabbit.x += rabbit.direction.x * rabbit.speed;
      rabbit.y += rabbit.direction.y * rabbit.speed;
      
      // Keep rabbit within bounds
      rabbit.x = Math.max(rabbit.size / 2, Math.min(canvas.width - rabbit.size / 2, rabbit.x));
      rabbit.y = Math.max(rabbit.size / 2, Math.min(canvas.height - rabbit.size / 2, rabbit.y));
      
      // Update squirrel position (chase the rabbit)
      const dx = rabbit.x - squirrel.x;
      const dy = rabbit.y - squirrel.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0) {
        squirrel.x += (dx / dist) * squirrel.speed;
        squirrel.y += (dy / dist) * squirrel.speed;
      }
      
      // Check for collision between rabbit and squirrel
      if (dist < rabbit.size / 2 + squirrel.size / 2) {
        setGameOver(true);
        cancelAnimationFrame(animationId);
        return;
      }
      
      // Check for collision between rabbit and acorns
      for (let i = acorns.length - 1; i >= 0; i--) {
        const acorn = acorns[i];
        const acornDist = Math.sqrt(
          (rabbit.x - acorn.x) ** 2 + (rabbit.y - acorn.y) ** 2
        );
        
        if (acornDist < rabbit.size / 2 + acornSize / 2) {
          // Remove collected acorn
          acorns.splice(i, 1);
          
          // Add new acorn
          acorns.push({
            x: Math.random() * (canvas.width - acornSize * 2) + acornSize,
            y: Math.random() * (canvas.height - acornSize * 2) + acornSize
          });
          
          // Increase score
          setScore(prevScore => prevScore + 1);
          
          // Increase squirrel speed slightly with each acorn
          squirrel.speed += 0.1;
        }
      }
      
      // Draw rabbit (white with pink nose and ears)
      drawRabbit(ctx, rabbit.x, rabbit.y, rabbit.size);
      
      // Draw squirrel (brown with fluffy tail)
      drawSquirrel(ctx, squirrel.x, squirrel.y, squirrel.size);
      
      // Draw acorns
      acorns.forEach(acorn => {
        drawAcorn(ctx, acorn.x, acorn.y, acornSize);
      });
      
      // Continue animation
      animationId = requestAnimationFrame(gameLoop);
    }
    
    // Start the game loop
    animationId = requestAnimationFrame(gameLoop);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStarted]);

  // Function to draw fallen leaves
  function drawFallenLeaves(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const autumnColors = [
      "#E6A74C", // Orange
      "#BB482D", // Red
      "#CDAD5D", // Yellow
      "#74480F", // Brown
      "#D4662F", // Dark orange
    ];
    
    // Draw 20 random leaves
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const rotation = Math.random() * 360;
      const size = 5 + Math.random() * 10;
      const color = autumnColors[Math.floor(Math.random() * autumnColors.length)];
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      // Draw a simple leaf shape
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 2, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.restore();
    }
  }

  // Function to draw the rabbit
  function drawRabbit(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    // Body
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(x, y, size / 2, size / 1.5, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Ears
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(x - size / 4, y - size / 1.2, size / 6, size / 2, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + size / 4, y - size / 1.2, size / 6, size / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Inner ears
    ctx.fillStyle = "#FFB6C1";
    ctx.beginPath();
    ctx.ellipse(x - size / 4, y - size / 1.2, size / 10, size / 3, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + size / 4, y - size / 1.2, size / 10, size / 3, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Face
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x - size / 6, y - size / 10, size / 12, 0, 2 * Math.PI); // Left eye
    ctx.arc(x + size / 6, y - size / 10, size / 12, 0, 2 * Math.PI); // Right eye
    ctx.fill();
    
    // Nose
    ctx.fillStyle = "#FFB6C1";
    ctx.beginPath();
    ctx.ellipse(x, y + size / 10, size / 8, size / 12, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Whiskers
    ctx.strokeStyle = "#CCCCCC";
    ctx.lineWidth = 1;
    
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(x - size / 8, y + size / 10);
    ctx.lineTo(x - size / 2, y);
    ctx.moveTo(x - size / 8, y + size / 10);
    ctx.lineTo(x - size / 2, y + size / 10);
    ctx.moveTo(x - size / 8, y + size / 10);
    ctx.lineTo(x - size / 2, y + size / 5);
    
    // Right whiskers
    ctx.moveTo(x + size / 8, y + size / 10);
    ctx.lineTo(x + size / 2, y);
    ctx.moveTo(x + size / 8, y + size / 10);
    ctx.lineTo(x + size / 2, y + size / 10);
    ctx.moveTo(x + size / 8, y + size / 10);
    ctx.lineTo(x + size / 2, y + size / 5);
    
    ctx.stroke();
  }

  // Function to draw the squirrel
  function drawSquirrel(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    // Body
    ctx.fillStyle = "#8B4513"; // Saddle brown
    ctx.beginPath();
    ctx.ellipse(x, y, size / 2, size / 1.8, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Head
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.arc(x, y - size / 2, size / 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Tail (fluffy and curved)
    ctx.fillStyle = "#A0522D"; // Sienna
    ctx.beginPath();
    ctx.moveTo(x - size / 4, y);
    
    // Draw an S-shaped tail
    ctx.bezierCurveTo(
      x - size, y, 
      x - size, y - size, 
      x - size / 2, y - size
    );
    
    ctx.bezierCurveTo(
      x, y - size, 
      x - size / 3, y - size / 2, 
      x - size / 4, y
    );
    
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x - size / 6, y - size / 1.8, size / 10, 0, 2 * Math.PI); // Left eye
    ctx.arc(x + size / 6, y - size / 1.8, size / 10, 0, 2 * Math.PI); // Right eye
    ctx.fill();
    
    // Nose
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.ellipse(x, y - size / 1.5, size / 9, size / 12, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Ears
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.ellipse(x - size / 3, y - size / 1.2, size / 8, size / 5, 0, 0, 2 * Math.PI); // Left ear
    ctx.ellipse(x + size / 3, y - size / 1.2, size / 8, size / 5, 0, 0, 2 * Math.PI); // Right ear
    ctx.fill();
  }

  // Function to draw an acorn
  function drawAcorn(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    // Acorn cap
    ctx.fillStyle = "#8B4513"; // Saddle brown
    ctx.beginPath();
    ctx.arc(x, y - size / 3, size / 1.5, Math.PI, 2 * Math.PI);
    ctx.fill();
    
    // Acorn body
    ctx.fillStyle = "#D2B48C"; // Tan
    ctx.beginPath();
    ctx.ellipse(x, y + size / 3, size / 2, size / 1.2, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Cap details
    ctx.strokeStyle = "#6B4226";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y - size / 3, size / 2, Math.PI + 0.2, 2 * Math.PI - 0.2);
    ctx.stroke();
  }

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent-2)' }}>
          Autumn&apos;s Woodland Chase
        </h1>
        <p className="mb-2">
          Help the rabbit collect acorns while avoiding the squirrel!
        </p>
        <div className="mt-4 mb-8">
          <Link 
            href="/" 
            className="text-sm font-medium inline-flex items-center"
            style={{ color: 'var(--accent-5)' }}
          >
            <span style={{ marginRight: '4px' }}>←</span> Back to Home
          </Link>
        </div>
      </header>
      
      <main className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <div className="w-full mb-4 flex justify-between items-center">
          <div className="text-lg font-bold" style={{ color: 'var(--accent-4)' }}>
            Score: {score}
          </div>
          {!gameStarted && !gameOver && (
            <button
              onClick={() => setGameStarted(true)}
              className="px-6 py-3 rounded-md transition-colors font-medium"
              style={{ 
                backgroundColor: 'var(--accent-5)', 
                color: '#FFF8F0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Start Game
            </button>
          )}
          {gameOver && (
            <button
              onClick={() => {
                setGameOver(false);
                setGameStarted(true);
                setScore(0);
              }}
              className="px-6 py-3 rounded-md transition-colors font-medium"
              style={{ 
                backgroundColor: 'var(--accent-5)', 
                color: '#FFF8F0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Play Again
            </button>
          )}
        </div>
        
        <div 
          className="relative w-full aspect-[4/3] border rounded-lg mb-4 overflow-hidden"
          style={{ border: '3px solid var(--accent-3)' }}
        >
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(255,248,240,0.9)] z-10">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-2)' }}>
                Woodland Chase
              </h2>
              <div className="max-w-md text-center px-4">
                <p className="mb-3"><strong>Controls:</strong> Use arrow keys or WASD to move the rabbit</p>
                <p className="mb-3"><strong>Goal:</strong> Collect as many acorns as possible</p>
                <p className="mb-3"><strong>Avoid:</strong> Getting caught by the squirrel!</p>
              </div>
            </div>
          )}
          
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(255,248,240,0.9)] z-10">
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent-2)' }}>
                Game Over!
              </h2>
              <p className="text-xl mb-4">
                Final Score: <strong>{score}</strong>
              </p>
              <p className="italic mb-6">The squirrel caught you!</p>
            </div>
          )}
          
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          />
        </div>
        
        <div className="bg-[rgba(205,173,93,0.1)] p-4 rounded-lg border max-w-2xl text-center" 
          style={{ border: '1px solid var(--accent-3)' }}>
          <h3 className="font-medium mb-2" style={{ color: 'var(--accent-4)' }}>How to Play</h3>
          <p className="mb-1">Use arrow keys or WASD to move the rabbit around the forest floor.</p>
          <p>Collect acorns to increase your score, but watch out — the squirrel gets faster with each acorn you collect!</p>
        </div>
      </main>
      
      <footer className="mt-16 pt-8 text-center text-sm" style={{ borderTop: '1px solid var(--accent-3)', color: 'var(--accent-4)' }}>
        <p>© {new Date().getFullYear()} Autumn&apos;s Cozy Corner | Created with Next.js among the falling leaves 🍁</p>
      </footer>
    </div>
  );
}