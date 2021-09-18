import "./App.css";
import Map from "./Map/Map";
import Alert from "./Alert/Alert";
import Legend from "./Legend/Legend";
import Feed from "./Feed/Feed";

function App() {
  // const locationFIP = "41035";
  // const locationState = "OR";
  const locationFIP = "42003";
  const locationState = "PA";
  let d = 1;
  return (
    <div className="App">
      <Alert userState={locationState} userFIP={locationFIP} />
      <div className="container">
        <Map />
        <Legend className="left-side" />
        <Feed dn={d} className="right-side" />
      </div>
    </div>
  );
}

export default App;
