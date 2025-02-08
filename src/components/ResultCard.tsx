import { motion } from "framer-motion";
import { useState } from "react";

export default function ResultCard({ imageId }: { imageId: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="relative w-60 h-110 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute w-full h-full flex items-center justify-center"
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/img/card/card-back.webp"
            alt="Card Back"
            className="block w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute w-full h-full items-center justify-center"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/img/card/card-back.webp"
            alt="Card Back"
            className="block w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
