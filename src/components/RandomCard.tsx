import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const cards = Array.from({ length: 28 }, (_, i) => i + 1);

export default function RandomCard() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const startRandomization = () => {
    let currentIndex = 0;
    let previousIndex = currentIndex;
    const interval = setInterval(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * cards.length);
      } while (newIndex === previousIndex);
      currentIndex = newIndex;
      setSelectedCard(cards[currentIndex]);
      previousIndex = currentIndex;
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      const finalCard = cards[Math.floor(Math.random() * cards.length)];
      setSelectedCard(finalCard);
      setIsResultVisible(true);
    }, 5000);
  };

  useEffect(() => {
    if (isResultVisible) {
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
      }, 3000);
      return () => clearTimeout(flipTimer);
    }
  }, [isResultVisible]);

  const closePopup = () => {
    setIsResultVisible(false);
    setIsFlipped(false);
    setSelectedCard(null);
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-10 gap-4 mt-6">
          {cards.slice(0, 20).map((card) => (
            <div
              key={card}
              className={`bg-gray-200 w-24 h-24 rounded-lg flex items-center justify-center border text-xl ${
                selectedCard === card ? "border-black border-8" : "border-white"
              }`}
            >
              <span>{card}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 gap-4 mt-4 justify-center">
          {cards.slice(20).map((card) => (
            <div
              key={card}
              className={`bg-gray-200 w-24 h-24 rounded-lg flex items-center justify-center border text-xl ${
                selectedCard === card ? "border-black border-8" : "border-white"
              }`}
            >
              <span>{card}</span>
            </div>
          ))}
        </div>
        <button
          onClick={startRandomization}
          className="bg-gray-200 mt-6 px-6 py-2 rounded-lg text-xl"
        >
          Predict your future
        </button>
      </div>

      {isResultVisible && selectedCard !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/75 z-50">
          <div className="flex flex-col">
            <motion.div
              className="relative w-48 h-64 rounded-lg flex items-center justify-center text-4xl font-bold shadow-lg"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute backface-hidden w-full h-full bg-gray-500 text-white flex items-center justify-center"
                style={{
                  transform: "rotateY(0deg)",
                }}
              >
                card
              </div>

              <div
                className="absolute backface-hidden w-full h-full bg-black text-white flex items-center justify-center"
                style={{
                  transform: "rotateY(180deg)",
                }}
              >
                {selectedCard}
              </div>
            </motion.div>
            <div className="text-center justify-center mt-2">text</div>
          </div>

          {isFlipped && (
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-black w-8 h-8 flex items-center justify-center text-xl font-bold"
            >
              X
            </button>
          )}
        </div>
      )}
    </div>
  );
}
