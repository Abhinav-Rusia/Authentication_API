import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left} transition-all duration-300 hover:opacity-60 hover:blur-2xl hover:shadow-[0_0_60px_20px_rgba(0,255,150,0.3)]`}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;
