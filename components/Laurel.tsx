"use client";

import { motion } from "framer-motion";

export default function Laurel({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  const leaves = Array.from({ length: 6 });
  return (
    <svg
      viewBox="0 0 120 200"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.path
        d="M100 10 C 40 30, 20 90, 30 190"
        stroke="#B8935F"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {leaves.map((_, i) => {
        const t = i / (leaves.length - 1);
        const y = 20 + t * 150;
        const x = 95 - t * 55 + Math.sin(t * Math.PI) * 8;
        const rotate = -30 - t * 40;
        return (
          <motion.ellipse
            key={i}
            cx={x}
            cy={y}
            rx="12"
            ry="5.5"
            fill="#D4B483"
            fillOpacity="0.55"
            stroke="#B8935F"
            strokeWidth="0.75"
            transform={`rotate(${rotate} ${x} ${y})`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + t * 1.1 }}
          />
        );
      })}
    </svg>
  );
}
