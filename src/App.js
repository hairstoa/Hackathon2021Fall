import './App.css';
import Map from './Map/Map.js';
import Alert from './Alert/Alert.js';
import Legend from './Legend/Legend';

function App() {
  const locationState = "GA";
  return (
    <div className="App">
      <Alert userState = {locationState} />
      <Map /> 
      <Legend />
    </div>
  );
}

export default App;
