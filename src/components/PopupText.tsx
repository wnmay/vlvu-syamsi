import { motion } from "framer-motion";

export default function PopupText() {
  return (
    <>
      <motion.div
        className="text-3xl text-[#372444] mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {"The stars have spoken...".split("").map((char, index) => (
          <motion.span
            key={`line1-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
        <br />
        {"May your love life be full of joy !".split("").map((char, index) => (
          <motion.span
            key={`line2-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: (index + 30) * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </>
  );
}
