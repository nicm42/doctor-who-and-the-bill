function Card({ name, imgsrc, imgalt, episodes }) {
  const imageURL = `assets/${imgsrc}`;
  // Put a comma between each episode
  const formattedEpisodes = episodes.map((episode, index) => (index > 0 ? `, ${episode}` : episode));

  return (
    <div className="card">
      <h2 className="card--name">{name}</h2>
      <img className="card--image" src={imageURL} alt={imgalt} />
      <p className="card--episodes">{formattedEpisodes}</p>
    </div>
  );
}

export default Card;
