"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

interface AnimationSettings {
  startVelocity: number;
  spread: number;
  ticks: number;
  zIndex: number;
  particleCount: number;
  origin: { x: number; y: number };
}

function getAnimationSettings(originXA: number, originXB: number): AnimationSettings {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  };
}

export default function Fireworks() {
  const refAnimationInstance = useRef<ReactCanvasConfetti | null>(null);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  const getInstance = useCallback((instance: ReactCanvasConfetti) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
        // @ts-ignore
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
    //   @ts-ignore
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (intervalId === undefined) {
      const id = window.setInterval(nextTickAnimation, 400);
      setIntervalId(id);
    //   wanted to stop after 3 secons
       setTimeout(() => {
         clearInterval(id);
          setIntervalId(undefined);

    },3000)
      
    }
  }, [intervalId, nextTickAnimation]);

  const pauseAnimation = useCallback(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [intervalId]);

  const stopAnimation = useCallback(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
    // @ts-ignore
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <>
         <button onClick={startAnimation} className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 text-xs py-1.5 px-4 items-center">
              <span className="pr-1.5">
              Click to Say!  Thank you🔥
              </span>
            </button>
      {/* @ts-ignore */}
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
}
