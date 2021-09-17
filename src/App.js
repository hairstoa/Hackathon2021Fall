import './App.css';
import Map from './Map/Map.js';
import Alert from './Alert/Alert.js';

function App() {
  const locationState = "GA";
  return (
    <div className="App">
      <Alert userState = {locationState} />
      <Map /> 
    </div>
  );
}

export default App;
