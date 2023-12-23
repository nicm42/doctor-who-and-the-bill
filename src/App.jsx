import { useState } from 'react';
import Card from './components/Card';
import './App.css';
import doctorwho from '../doctor-who.json';
import thebill from '../the-bill.json';

function App() {
  const [whatToShow, setWhatToShow] = useState('');
  const textToShowSame = whatToShow === 'doctorwho' ? 'Doctor Who' : whatToShow === 'thebill' ? 'The Bill' : '';
  const textToShowOpposite = whatToShow === 'doctorwho' ? 'The Bill' : whatToShow === 'thebill' ? 'Doctor Who' : '';

  const headerText = `${textToShowSame} regulars who have been in ${textToShowOpposite}`;
  const subtitleText = `Here are the regulars from  ${textToShowSame} who have been in ${textToShowOpposite} and the episodes they've been in`;

  return (
    <>
      <button onClick={() => setWhatToShow('doctorwho')}>Show Doctor Who regulars</button>
      <button onClick={() => setWhatToShow('thebill')}>Show The Bill regulars</button>
      {whatToShow && <h1>{headerText}</h1>}
      {whatToShow && <p>{subtitleText}</p>}
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
