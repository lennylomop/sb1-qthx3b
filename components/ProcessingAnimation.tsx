"use client";

import { motion } from "framer-motion";

export default function ProcessingAnimation() {
  return (
    <div className="relative w-64 h-64">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Businessman silhouette */}
          <motion.path
            d="M50 20 C40 20 35 30 35 40 C35 50 40 55 50 55 C60 55 65 50 65 40 C65 30 60 20 50 20"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Briefcase */}
          <motion.path
            d="M35 60 L65 60 L65 80 L35 80 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ y: 5 }}
            animate={{ y: -5 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          
          {/* Loading circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Ihre PDF wird verarbeitet...
      </motion.div>
    </div>
  );
}