import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showHeart, setShowHeart] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showMaybeButton, setShowMaybeButton] = useState(true); // State to control the visibility of the "Maybe" button
  const [buttonNoStyle, setButtonNoStyle] = useState({
    position: 'static',
    left: 0,
    top: 0,
    zIndex: 9998
  });
  const [buttonYesStyle, setButtonYesStyle] = useState({
    position: 'static',
    left: 0,
    top: 0,
    zIndex: 9999
  });
  const [quoteStyle, setQuoteStyle] = useState({
    position: 'absolute',
    left: '50%',
    top: '66%',
    transform: 'translate(-50%, -50%)',
    fontSize: '20px'
  });
  const [quote, setQuote] = useState('');
  const [usedQuotes, setUsedQuotes] = useState([]);
  const quotes = [
    "Whyyyyy",
    "Bấm lộn rồi em",
    "Thiệc hả trờiiii",
    "Yes đi má",
    "Ko cho bấm NO đâuu",
    "Bấm Yes đi màa 😭😭😭",
    "Ai cho NO!!!",
    "...",
    "Ghét đó nhaa"
  ];
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const gifList = [
    "https://tenor.com/view/peach-goma-love-gif-2843565955560886567.gif",
    "https://tenor.com/view/mochi-mochi-cat-mochi-mochi-peach-cat-gif-mochi-hug-hug-kiss-gif-468847519449701899.gif",
    "https://tenor.com/view/kiss-จูบ-gif-27696365.gif",
    "https://tenor.com/view/yeah-im-hungry-milk-and-mocha-clingy-bite-cute-gif-11654750007600127560.gif",
    "https://tenor.com/view/hugs-love-no-crying-gif-3920521347500088187.gif",
    "https://tenor.com/view/goma-cat-peach-cat-flirty-flirty-eyes-suggestive-gif-5662174275267441567.gif",
    "https://tenor.com/view/when-nath-nathy-nath-luv-cute-gif-18343248668773542046.gif",
    "https://tenor.com/view/peach-goma-cat-kiss-bed-gif-7557349839419090578.gif"
  ];

  useEffect(() => {
    if (!showHeart) {
      const intervalId = setInterval(() => {
        const newLeft = Math.max(0, Math.min(window.innerWidth - 100, Math.random() * window.innerWidth));
        const newTop = Math.max(0, Math.min(window.innerHeight - 40, Math.random() * window.innerHeight));
        setButtonNoStyle(prevStyle => ({
          ...prevStyle,
          left: newLeft,
          top: newTop,
        }));
        setButtonYesStyle(prevStyle => ({
          ...prevStyle,
          left: Math.random() * window.innerWidth,
          top: Math.random() * window.innerHeight
        }));
      }, 60000); // Change the interval duration as needed

      return () => clearInterval(intervalId);
    }
  }, [showHeart]);

  const handleNoClick = () => {
    let remainingQuotes = quotes.filter(q => !usedQuotes.includes(q));
    if (remainingQuotes.length === 0) {
      remainingQuotes = quotes.slice(); // Start over if all quotes have been used
      setUsedQuotes([]);
    }
    const randomIndex = Math.floor(Math.random() * remainingQuotes.length);
    const randomQuote = remainingQuotes[randomIndex];
    setQuote(randomQuote);
    setUsedQuotes([...usedQuotes, randomQuote]);
    const currentFontSize = parseInt(quoteStyle.fontSize);
    if (currentFontSize < 100) { // Maximum font size
      setQuoteStyle(prevStyle => ({
        ...prevStyle,
        fontSize: `${currentFontSize + 4}px` // Increase font size by 2px
      }));
    }
    const newLeft = Math.max(0, Math.min(window.innerWidth - 100, Math.random() * (window.innerWidth / 2))); // Adjusted to limit to the left half of the screen
    const newTop = Math.max(0, Math.min(window.innerHeight - 40, Math.random() * window.innerHeight));
    setButtonNoStyle({
      ...buttonNoStyle,
      position: 'absolute',
      left: newLeft,
      top: newTop
    });
  };

  const handleYesClick = () => {
    setShowHeart(true);
    setButtonYesStyle({
      ...buttonYesStyle,
      animation: 'bump 1s infinite alternate'
    });
    setTimeout(() => {
      document.querySelector('.App').style.backgroundColor = '#8E2123';
    }, 1000); // Adjust timing to match the transition duration
  };

  const handleHeartClick = () => {
    setShowGif(true);
  };

  const switchGif = () => {
    setCurrentGifIndex((currentGifIndex + 1) % gifList.length);
  };

  const handleMaybeClick = () => {
    setShowMaybeButton(false); // Hide the "Maybe" button when clicked
    const firstQuote = "Ai cho maybe em"; // First quote
    const combinedQuote = `${firstQuote}`; // Concatenate both quotes with a newline character
    setQuote(combinedQuote);
    setQuoteStyle({
      ...quoteStyle,
      display: 'block' // Show the quote
    });
  };

  return (
    <div className="App">
      {!showHeart ? (
        <div>
          <div className="text-container">
            <p className="valentine-text">WILL YOU BE MY VALENTINE ?</p>
          </div>
          <div className="button-container">
            <button style={buttonNoStyle} onClick={handleNoClick}>No</button>
            <button className="button-bump" style={buttonYesStyle} onClick={handleYesClick}>Yes</button>
          </div>
          {quote && (
            <div className="quote-container" style={quoteStyle}>
              <p>{quote}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {!showGif ? (
            <div className="heart-container">
              <span role="img" aria-label="heart" className="heart" title="Chọt dô đây thử" onClick={handleHeartClick}>
                ❤️
              </span>
              <div className="thank-you">
                Thank you for being with me
              </div>
              <div className="love-you">
                I love you &lt;3 2205 !!!
              </div>
            </div>
          ) : (
            <div className="gif-container">
              <img className='gif' src={gifList[currentGifIndex]} alt="GIF"  onClick={switchGif}/>
            </div>
          )}
        </div>
      )}
      {showMaybeButton && (
        <button className="button-maybe" onClick={handleMaybeClick}>Maybe</button>
      )}
    </div>
  );
}

export default App;
