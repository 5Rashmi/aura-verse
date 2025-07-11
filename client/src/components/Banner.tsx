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
    <section className="relative w-full h-[90vh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 bg-[url('/stars-bg.jpg')] bg-cover bg-center z-0" />

      {/* Overlay + Blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />

      {/* Lottie Meditation Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="z-20 w-[300px] sm:w-[400px]"
      >
        <Lottie animationData={emojiAnim} loop autoplay />
      </motion.div>

      {/* Tagline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="z-20 text-3xl sm:text-4xl font-semibold mt-6 bg-gradient-to-r from-teal-300 via-pink-300 to-purple-400 text-transparent bg-clip-text"
      >
        Let your mood shape your world
      </motion.h2>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToGlobe}
        className="z-20 mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white text-lg font-medium shadow-lg"
      >
        Start Your Journey
      </motion.button>
    </section>
  );
}
