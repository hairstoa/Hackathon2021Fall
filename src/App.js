import './App.css';
import Map from './Map/Map';
import Alert from './Alert/Alert';
import Legend from './Legend/Legend';
import Feed from './Feed/Feed';

function App() {
  const locationFIP = "41035";
  const locationState = "OR";
  let d = 1;
  return (
    <div className="App">
      <Alert userState = { locationState } userFIP = { locationFIP } />
      <Map /> 
      <Legend />
      <Feed dn = { d } />
    </div>
  );
}

export default App;
