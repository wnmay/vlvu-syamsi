import { useState, useEffect } from "react";
import Card from "./Card";
import PopupText from "./PopupText";

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
    }, 250);

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
        <div className="text-[#FCFCF4] text-3xl font-blod text-center">
          Live without love is sky without sun, moon without stars and <br></br>{" "}
          life without happiness
        </div>
        <div className="grid grid-cols-10 gap-4 mt-6">
          {cards.slice(0, 20).map((card) => (
            <div
              key={card}
              className={`w-20 h-36 rounded-lg flex items-center justify-center border text-xl ${
                selectedCard === card
                  ? "border-[#FCFCF4] border-8"
                  : "border-white"
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
              className={`w-20 h-36 rounded-lg flex items-center justify-center border text-xl ${
                selectedCard === card
                  ? "border-[#FCFCF4] border-8"
                  : "border-white"
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
          className="border-2 border-[#372444] bg-[#FCFCF4] mt-4 px-6 py-2 rounded-lg text-xl text-[#372444] font-semibold hover:bg-[#372444] hover:text-[#FCFCF4]"
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
              X
            </button>
          )}
        </div>
      )}
    </>
  );
}
