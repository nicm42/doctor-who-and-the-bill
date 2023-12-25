import PropTypes from 'prop-types';
import './Card.scss';

function Card({ name, imgsrc, imgalt, episodes }) {
  const imageURL = `assets/${imgsrc}`;

  return (
    <div className="card" data-testid="card">
      <img className="card--image" src={imageURL} alt={imgalt} />
      <div className="card--text">
        <h2 className="card--name">{name}</h2>
        <ul className="card--episodes">
          {episodes.map((episode) => (
            <li className="card--episode" key={episode}>
              {episode}
            </li>
          ))}
        </ul>
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
