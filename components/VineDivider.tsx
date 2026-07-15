"use client";

import { motion } from "framer-motion";

export default function VineDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`mx-auto my-2 w-full max-w-md ${flip ? "scale-y-[-1]" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <motion.path
          d="M2 20 C 60 2, 90 38, 140 20 S 220 2, 260 20 S 340 38, 398 20"
          stroke="#B8935F"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="200"
          cy="20"
          r="3"
          fill="#B8935F"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />
      </svg>
    </div>
  );
}
