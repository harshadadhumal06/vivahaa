"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth, type ItemType } from "@/context/AuthContext";

interface SaveButtonProps {
  type: ItemType;
  id: string;
  className?: string;
  variant?: "dark" | "light";
}

export default function SaveButton({
  type,
  id,
  className = "",
  variant = "dark",
}: SaveButtonProps) {
  const { isSaved, toggleSaved, user } = useAuth();
  const saved = isSaved(type, id);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(type, id);
      }}
      aria-label={saved ? "Remove from saved" : "Save to my account"}
      aria-pressed={saved}
      title={
        user
          ? saved
            ? "Saved to your account"
            : "Save to your account"
          : "Sign in to save"
      }
      className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
        variant === "dark"
          ? "bg-ivory/90 text-forest hover:bg-ivory"
          : "bg-forest/10 text-forest hover:bg-forest/20"
      } ${className}`}
    >
      <Heart
        size={16}
        className={saved ? "fill-gold text-gold" : ""}
        strokeWidth={2}
      />
    </motion.button>
  );
}
