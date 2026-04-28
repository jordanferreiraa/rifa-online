"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function SuccessAnimation() {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20"
      >
        <motion.div
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Check className="h-12 w-12 text-white stroke-[3px]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
