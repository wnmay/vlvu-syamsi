import { motion } from "framer-motion";

interface CardProps {
  isFlipped: boolean;
  cardNumber: number;
}

export default function Card({ isFlipped, cardNumber }: CardProps) {
  return (
    <motion.div
      className="relative w-60 h-100 rounded-lg flex items-center justify-center text-4xl font-bold shadow-lg"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute w-full h-full flex items-center justify-center backface-hidden"
        style={{
          transform: "rotateY(0deg)",
        }}
      >
        <img
          src="/img/card/card-back.webp"
          alt="Card Back"
          className="block w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute w-full h-full flex items-center justify-center backface-hidden"
        style={{
          transform: "rotateY(180deg)",
        }}
      >
        <img
          src={`https://placehold.co/100x300`}
          alt={`Card ${cardNumber}`}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}
