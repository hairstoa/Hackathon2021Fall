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
  lat: null,
  lon: null, 
  fips: null,
  county_name: null,
  state_name: null,
  state_code: null,
}

function App() {
  const [location, setLocation] = useState(INIT_LOCATION);
  // eslint-disable-next-line
  const updateLocationHandler = (loc) => {
    setLocation(prevLocation => {
      return {
      lat: loc.lat,
      lon: loc.lon, 
      fips: loc.fips,
      county_name: loc.county_name,
      state_name: loc.state_name,
      state_code: loc.state_code};
    });
  }
  // eslint-disable-next-line
  const setLocationCoordsHandler = (loc) => {
    setLocation(prevLocation => {
      return {
      ...prevLocation, 
      lat: loc.fips,
      lon: loc.county_name};
    });
  }
  
  const locationFIP = "06001";
  const locationState = "CA";
  // const locationFIP = "42003";
  // const locationState = "PA";
  let d = 1;
  return (
    <div className="App">
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand style={{color: "red"}}>Drought Tracker</Navbar.Brand>
        </Container>
      </Navbar>
      <Alert userState={locationState} userFIP={locationFIP} />
      {/* <Alert userState={location.state_code} userFIP={location.fips} /> */}
      <div className="container">
        <Map />
        {/* <Map updateLocation = { updateLocationHandler} setLocation = {setLocationCoordsHandler} /> */}
        <Legend className="left-side" />
        <Feed dn={d} className="right-side" />
      </div>
    </div>
  );
}

export default App;
