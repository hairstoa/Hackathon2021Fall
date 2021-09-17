import React, {useState} from "react";
import fips from "../../FIPS.js";
import "./Alert.css";

function Alert(props) {

    const [alertStatus, setAlertStatus] = useState([]);

    async function alertHandler(userState, userFIP) {
        let uri = "https://api.weather.gov/alerts/active?area=" + userState;
        const response = await fetch(uri);
        const weatherData = await response.json();
        // Filter the results for warnings with matching FIPS to the users location
        weatherData.filter(alert => {
            return ( alert.features.length > 0 ) && matchFIPS(alert.features, userFIP)
        })
        setAlertStatus(weatherData.title);
    }

    // For each of the FIPS in the alert, check if the userFIP is listed
    const matchFIPS = (alertLocations, userFIP) => { 
        // Add a zero to the front of the userFIP because for some reason that is how it is formatted 
        // in the JSON returned from weather API
        const formatFIP = "0" + userFIP;
        return alertLocations.geocode.SAME && alertLocations.geocode.SAME.includes(formatFIP);
    }
   
    return(
        <div className="alert-box">
            <div onLoad={alertHandler(props.userState, props.userFIP)}> { alertStatus }</div>
        </div>
    )
}

export default Alert;