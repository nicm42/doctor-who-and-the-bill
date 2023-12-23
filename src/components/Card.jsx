import Image from '../assets/davidtennant.jpg';

function Card() {
  return (
    <div className="card">
      <h2 className="card--name">David Tennant</h2>
      <img className="card--image" src={Image} alt="David Tennant" />
      <p className="card--episodes">Deadline</p>
    </div>
  );
}

export default Card;
