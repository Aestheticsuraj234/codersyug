"use client"
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const ConfettiProvider = () => {
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    // Add logic to trigger confetti when needed
    // For example, you can set `isConfettiActive` to true when you want to start the confetti animation.
    // You can trigger this based on some event or condition in your application.
    // For now, we'll set it to true after a 2-second delay for demonstration purposes.
    const timeout = setTimeout(() => {
      setIsConfettiActive(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isConfettiActive && (
        <ReactConfetti
          className="pointer-events-none z-[100]"
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={() => {
            // Callback function when confetti animation is complete
          }}
        />
      )}
    </>
  );
};

export default ConfettiProvider;
