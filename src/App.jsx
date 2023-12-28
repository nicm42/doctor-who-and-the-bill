import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useTitle } from './hooks/useTitle';
import { useFavicon } from './hooks/useFavicon';
import sortByName from './utils/sortByName';
import Card from './components/Card';
import './App.scss';
import doctorwho from '../doctor-who.json';
import thebill from '../the-bill.json';

function App() {
  const [whatToShow, setWhatToShow] = useState('');
  const [headerText, setHeaderText] = useState(
    'Doctor Who regulars who have been in The Bill and The Bill regulars who have been in Doctor Who',
  );
  const [subtitleText, setSubtitleText] = useState(
    'Press a button to see Doctor Who regulars who have been in The Bill or The Bill regulars who have been in Doctor Who',
  );

  const sortedDoctorWho = useRef(sortByName(doctorwho));
  const sortedTheBill = useRef(sortByName(thebill));
  console.log(thebill);
  console.log(sortedTheBill);

  useTitle(whatToShow);
  useFavicon(whatToShow);

  const dwdisabled = whatToShow === 'doctorwho' ? 'true' : 'false';
  const tbdisabled = whatToShow === 'thebill' ? 'true' : 'false';

  const showCards = (showText) => {
    let textToShowSame;
    let textToShowOpposite;

    if (showText === 'doctorwho') {
      textToShowSame = 'Doctor Who';
      textToShowOpposite = 'The Bill';
    }

    if (showText === 'thebill') {
      textToShowSame = 'The Bill';
      textToShowOpposite = 'Doctor Who';
    }

    setHeaderText(`${textToShowSame} regulars who have been in ${textToShowOpposite}`);
    setSubtitleText(
      `Here are the regulars from  ${textToShowSame} who have been in ${textToShowOpposite} and the episodes they've been in`,
    );

    if (showText !== whatToShow) {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          flushSync(() => {
            setWhatToShow(showText);
          });
        });
      } else {
        setWhatToShow(showText);
      }
    }
  };

  return (
    <>
      <h1>{headerText}</h1>
      <p>{subtitleText}</p>
      <div className="buttons">
        <button onClick={() => showCards('doctorwho')} aria-disabled={dwdisabled}>
          Show Doctor Who regulars
        </button>
        <button onClick={() => showCards('thebill')} aria-disabled={tbdisabled}>
          Show The Bill regulars
        </button>
      </div>
      <div className="cards">
        {whatToShow === 'doctorwho' &&
          sortedDoctorWho.current.map((person, index) => (
            <Card
              key={person.name}
              name={person.name}
              imgsrc={person.image.src}
              imgalt={person.image.alt}
              episodes={person.episodes}
              index={index}
              whatToShow={whatToShow}
            />
          ))}
        {whatToShow === 'thebill' &&
          sortedTheBill.current.map((person, index) => (
            <Card
              key={person.name}
              name={person.name}
              imgsrc={person.image.src}
              imgalt={person.image.alt}
              episodes={person.episodes}
              index={index}
              whatToShow={whatToShow}
            />
          ))}
      </div>
    </>
  );
}

export default App;
