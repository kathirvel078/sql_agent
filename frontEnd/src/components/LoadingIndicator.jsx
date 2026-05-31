import React from 'react';
import { motion } from 'framer-motion';

const LoadingIndicator = () => {
  return (
    <div className="flex space-x-2 justify-center items-center p-4">
      <motion.div
        className="w-2.5 h-2.5 bg-primary/60 rounded-full"
        animate={{
          y: ["0%", "-50%", "0%"]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="w-2.5 h-2.5 bg-primary/60 rounded-full"
        animate={{
          y: ["0%", "-50%", "0%"]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      <motion.div
        className="w-2.5 h-2.5 bg-primary/60 rounded-full"
        animate={{
          y: ["0%", "-50%", "0%"]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />
    </div>
  );
};

export default LoadingIndicator;
