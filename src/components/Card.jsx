import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

function Card({ name, imgsrc, imgalt, episodes }) {
  const [showEpisodes, setShowEpisodes] = useState();
  const [isClosing, setIsClosing] = useState(false);

  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  let closeButtonHeight = 0;

  const closeModal = () => {
    const fadeOutTime = 300;
    setIsClosing(true);
    document.documentElement.style.setProperty('--fade-out-time', `${fadeOutTime}ms`);
    setTimeout(() => {
      setShowEpisodes(false);
      openButtonRef.current.focus();
      setIsClosing(false);
    }, fadeOutTime);
  };

  // Get close button height so we can make sure episodes list is not on top of it
  useEffect(() => {
    if (showEpisodes) {
      closeButtonHeight = closeButtonRef.current?.offsetHeight;
      document.documentElement.style.setProperty('--close-button-height', `${closeButtonHeight}px`);
      // Focus close button
      closeButtonRef.current?.focus();
    }
  }, [showEpisodes]);

  // Close modal when escape key is pressed
  // And trap focus
  useEffect(() => {
    const handleKeyboard = (event) => {
      if (showEpisodes) {
        if (event.key === 'Escape') {
          closeModal();
        }
        if (event.key === 'Tab') {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [showEpisodes, setShowEpisodes]);

  const imageURL = `assets/${imgsrc}`;

  return (
    <div className="card" data-testid="card">
      <img className="card--image" loading="lazy" src={imageURL} alt={imgalt} />
      <div className="card--text">
        <h2 className="card--name">{name}</h2>
        <button className="card--button" ref={openButtonRef} onClick={() => setShowEpisodes(true)}>
          Show episodes
        </button>
        {showEpisodes && (
          <>
            <div
              className={isClosing ? 'card--episodes-overlay closing' : 'card--episodes-overlay'}
              data-testid="card-overlay"
              onClick={() => closeModal()}
            ></div>
            <div className={isClosing ? 'card--episodes closing' : 'card--episodes'}>
              <button
                className="card--episodes-close"
                aria-label="Close"
                ref={closeButtonRef}
                onClick={() => closeModal()}
              >
                X
              </button>
              <ul className="card--episodes-list" aria-label="Episode list">
                {episodes.map((episode) => (
                  <li className="card--episode" key={episode}>
                    {episode}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imgsrc: PropTypes.string.isRequired,
  imgalt: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
};

export default Card;
