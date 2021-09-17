import './App.css';
import Map from './Map/Map.js';
import Alert from './Alert/Alert.js';

function App() {
  const locationFIP = "41035";
  const locationState = "OR";
  return (
    <div className="App">
      <Alert userState = { locationState } userFIP = { locationFIP } />
      <Map /> 
    </div>
  );
}

export default App;
