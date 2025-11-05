import React, { useRef } from "react";
import "./FloatingButton.css";

function FloatingButton({ children }) {
  const btnRef = useRef(null);

  // Event handler for mouse movement
  function handleMouseMove(e) {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on cursor position
    const rotateX = ((y - centerY) / centerY) * 10; // Max 10deg X
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg Y

    btn.style.transform = `perspective(700px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
    btn.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 16px rgba(0,0,0,0.15)`;
  }
  function handleMouseLeave() {
    const btn = btnRef.current;
    btn.style.transform = "";
    btn.style.boxShadow = "";
  }

  return (
    <button
      ref={btnRef}
      className="floating-btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="flip-content">{children}</span>
    </button>
  );
}

export default FloatingButton;
