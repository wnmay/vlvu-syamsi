import { motion } from "framer-motion";
import { useState } from "react";

export default function ResultCard({ imageId }: { imageId: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="relative w-70 h-130 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="absolute w-full h-full flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src="/img/card/card-back.webp"
            alt="Card Back"
            className="block w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          className="absolute w-full h-full flex items-center justify-center"
          animate={{ rotateY: 180 }}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src={`/img/card/result/${imageId}.webp`}
            alt="Card Front"
            className="block w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
