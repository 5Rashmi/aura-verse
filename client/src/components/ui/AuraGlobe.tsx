"use client";
import React from "react";

type AuraGlobeType = {
  color: string;
  emoji: string;
  label: string;
};

const AuraGlobe = ({ color = "#00ffff", emoji, label }: AuraGlobeType) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Mood Label */}
      <p
        className="text-2xl font-medium tracking-wide text-white px-6 py-2 rounded-md"
        style={{
          color,
          textShadow: `0 0 6px ${color}, 0 0 12px ${color}88`,
          fontFamily: "'Geist Sans', 'Poppins', 'Raleway', sans-serif",
        }}
      >
        {emoji} Feeling {label}
      </p>

      {/* Glowing Aura Globe */}
      <div
        className="w-56 h-56 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle at center, ${color}, transparent 60%)`,
          boxShadow: `0 0 50px 10px ${color}`,
        }}
      />
    </div>
  );
};

export default AuraGlobe;
