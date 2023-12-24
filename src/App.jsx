import { useState } from 'react';
import { useTitle } from './hooks/useTitle';
import { useFavicon } from './hooks/useFavicon';
import Card from './components/Card';
import './App.scss';
import doctorwho from '../doctor-who.json';
import thebill from '../the-bill.json';

function App() {
  const [whatToShow, setWhatToShow] = useState('');

  useTitle(whatToShow);
  useFavicon(whatToShow);

  const textToShowSame = whatToShow === 'doctorwho' ? 'Doctor Who' : whatToShow === 'thebill' ? 'The Bill' : '';
  const textToShowOpposite = whatToShow === 'doctorwho' ? 'The Bill' : whatToShow === 'thebill' ? 'Doctor Who' : '';

  const headerText = `${textToShowSame} regulars who have been in ${textToShowOpposite}`;
  const subtitleText = `Here are the regulars from  ${textToShowSame} who have been in ${textToShowOpposite} and the episodes they've been in`;

  const dwdisabled = whatToShow === 'doctorwho' ? 'true' : 'false';
  const tbdisabled = whatToShow === 'thebill' ? 'true' : 'false';

  return (
    <>
      {whatToShow && <h1>{headerText}</h1>}
      {whatToShow && <p>{subtitleText}</p>}
      <div className="buttons">
        <button
          onClick={() => {
            whatToShow !== 'doctorwho' ? setWhatToShow('doctorwho') : '';
          }}
          aria-disabled={dwdisabled}
        >
          Show Doctor Who regulars
        </button>
        <button
          onClick={() => {
            whatToShow !== 'thebill' ? setWhatToShow('thebill') : '';
          }}
          aria-disabled={tbdisabled}
        >
          Show The Bill regulars
        </button>
      </div>
      {whatToShow === 'doctorwho' &&
        doctorwho.map((person) => (
          <Card
            key={person.name}
            name={person.name}
            imgsrc={person.image.src}
            imgalt={person.image.alt}
            episodes={person.episodes}
          />
        ))}
      {whatToShow === 'thebill' &&
        thebill.map((person) => (
          <Card
            key={person.name}
            name={person.name}
            imgsrc={person.image.src}
            imgalt={person.image.alt}
            episodes={person.episodes}
          />
        ))}
    </>
  );
}

export default App;
