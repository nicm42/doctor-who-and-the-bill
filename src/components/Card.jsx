import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

function Card({ name, imgsrc, imgalt, episodes }) {
  const [showEpisodes, setShowEpisodes] = useState();
  const closeButtonRef = useRef(null);
  let closeButtonHeight = 0;

  useEffect(() => {
    if (showEpisodes) {
      closeButtonHeight = closeButtonRef.current?.offsetHeight;
      document.documentElement.style.setProperty('--close-button-height', `${closeButtonHeight}px`);
    }
  }, [showEpisodes]);

  const imageURL = `assets/${imgsrc}`;

  return (
    <div className="card" data-testid="card">
      <img className="card--image" loading="lazy" src={imageURL} alt={imgalt} />
      <div className="card--text">
        <h2 className="card--name">{name}</h2>
        <button className="card--button" onClick={() => setShowEpisodes(true)}>
          Show episodes
        </button>
        {showEpisodes && (
          <>
            <div className="card--episodes-overlay"></div>
            <div className="card--episodes">
              <button className="card--episodes-close" ref={closeButtonRef} onClick={() => setShowEpisodes(false)}>
                X
              </button>
              <ul className="card--episodes-list">
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
