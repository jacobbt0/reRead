import React, { useState , useEffect } from 'react';

const Slider = () => {
  const quotes = [
    { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
    { text: "Reading is to the mind what exercise is to the body.", author: "Joseph Addison" },
    { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
    { text: "Books are a uniquely portable magic.", author: "Stephen King" },
    { text: "We read to know we are not alone.", author: "C.S. Lewis" },
    { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => {
    setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote(
      (prevQuote) => (prevQuote - 1 + quotes.length) % quotes.length
    );
  };

  const selectQuote = (index) => {
    setCurrentQuote(index);
  };


  useEffect(() => {
    const interval = setInterval(nextQuote, 4000); 

    
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10">
      <div className="overflow-hidden rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white p-8">
        <p className="text-2xl font-semibold italic mb-4">"{quotes[currentQuote].text}"</p>
        <p className="text-xl text-right">— {quotes[currentQuote].author}</p>
      </div>

      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
        <button
          onClick={prevQuote}
          className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
        >
          &#60;
        </button>
        <button
          onClick={nextQuote}
          className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
        >
          &#62;
        </button>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => selectQuote(index)}
            className={`w-4 h-4 rounded-full ${
              currentQuote === index
                ? 'bg-black'
                : 'bg-opacity-50 bg-black hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
