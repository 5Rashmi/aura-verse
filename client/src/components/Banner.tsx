"use client";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import emojiAnim from "../assets/animation/emojimood.json";

export default function CreativeBanner({
  scrollToGlobe,
}: {
  scrollToGlobe: () => void;
}) {
  return (
    <section className="relative w-full h-[90vh] flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Overlay for background blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      {/* Lottie Animation - Larger, centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="z-10 w-[300px] sm:w-[450px] max-h-[300px] sm:max-h-[400px] overflow-hidden"
      >
        <Lottie animationData={emojiAnim} loop autoplay />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="z-10 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-300 via-pink-300 to-purple-400 text-transparent bg-clip-text mt-4"
      >
        AuraVerse
      </motion.h2>

      {/* Typing Text */}
      <h2 className="z-10 mt-1 font-mono text-xl sm:text-3xl font-medium typing-text">
        Let your mood shape your world
      </h2>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1 }}
        onClick={scrollToGlobe}
        className="z-10 mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white text-lg font-medium shadow-lg"
      >
        Start Your Journey
      </motion.button>
    </section>
  );
}
