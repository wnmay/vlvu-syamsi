import { useState, useEffect } from "react";
import Card from "./Card";
import PopupText from "./PopupText";

const cards = Array.from({ length: 28 }, (_, i) => i + 1);

export default function RandomCard() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const startRandomization = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 6000);
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
    }, 500);

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
      }, 3500);
      return () => clearTimeout(flipTimer);
    }
  }, [isResultVisible]);

  const closePopup = () => {
    setIsResultVisible(false);
    setIsFlipped(false);
    setSelectedCard(null);
  };

  return (
    <>
      <div
        className="relative w-full min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/bg-booth.webp')" }}
      >
        <div className="text-[#FCFCF4] pt-2 text-3xl text-center">
          Live without love is sky without sun, moon without stars and <br></br>{" "}
          life without happiness
        </div>
        <div className="grid grid-cols-10 gap-4 mt-6">
          {cards.slice(0, 20).map((card) => (
            <div
              key={card}
              className={`relative w-20 h-36 rounded-lg flex items-center justify-center bg-transparent transition-all ${
                selectedCard === card
                  ? "shadow-[0_0_20px_10px_rgba(255,255,255)] backdrop-blur-sm"
                  : ""
              }`}
            >
              <img
                src="/img/card/card-back.webp"
                alt="Card Back"
                className="block w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 gap-4 mt-4 justify-center">
          {cards.slice(20).map((card) => (
            <div
              key={card}
              className={`relative w-20 h-36 rounded-lg flex items-center justify-center bg-transparent transition-all ${
                selectedCard === card
                  ? "shadow-[0_0_20px_10px_rgba(255,255,255)] backdrop-blur-sm"
                  : ""
              }`}
            >
              <img
                src="/img/card/card-back.webp"
                alt="Card Back"
                className="block w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button
          onClick={startRandomization}
          className={`border-2 border-[#372444] bg-[#FCFCF4] mt-2 px-6 py-2 rounded-lg text-xl text-[#372444] hover:opacity-50 ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Predict your future
        </button>
      </div>

      {isResultVisible && selectedCard !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/75 z-50">
          <div className="flex flex-col items-center justify-center text-center">
            <Card isFlipped={isFlipped} cardNumber={selectedCard} />
            <PopupText />
          </div>

          {isFlipped && (
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-black w-8 h-8 flex items-center justify-center text-xl font-bold"
            >
              x
            </button>
          )}
        </div>
      )}
    </>
  );
}
