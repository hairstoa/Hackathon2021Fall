// eslint-disable-next-line
import React, {useState, useEffect} from 'react';

import { Container, Navbar } from 'react-bootstrap';

import Map from "./Map/Map";
import Alert from "./Alert/Alert";
import Legend from "./Legend/Legend";
import Feed from "./Feed/Feed";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const INIT_LOCATION = {
  fips: null,
  state_code: null,
}

function App() {
  const [location, setLocation] = useState(INIT_LOCATION);
  let d = 1;
  return (
    <div className="App">
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand style={{color: "red"}}>Drought Tracker</Navbar.Brand>
        </Container>
      </Navbar>
      <Alert userState={location.state_code} userFIP={location.fips} />
      <div className="container">
        <Map updateLocation = {setLocation} />
        <Legend className="left-side" />
        <Feed dn={d} className="right-side" />
      </div>
    </div>
  );
}

export default App;