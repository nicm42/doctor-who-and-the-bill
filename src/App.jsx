import Card from './components/Card';
import './App.css';
import doctorwho from '../doctor-who.json';
//import thebill from '../the-bill.json'

function App() {
  return (
    <>
      {doctorwho.map((person) => (
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
