import { useState } from "react";

const cards = Array.from({ length: 28 }, (_, i) => i + 1);

export default function RandomCard() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

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
      console.log(currentIndex);
      previousIndex = currentIndex;
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      const finalCard = cards[Math.floor(Math.random() * cards.length)];
      setSelectedCard(finalCard);
    }, 5000);
  };

  return (
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
  );
}
