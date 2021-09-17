import React, {useState} from "react";
import "./Alert.css";

function Alert(props) {

    const [alertStatus, setAlertStatus] = useState("No alerts.");

    async function alertHandler(userState) {
        let uri = "https://api.weather.gov/alerts/active?area=" + userState;
        const response = await fetch(uri);
        const weatherData = await response.json();
        setAlertStatus(weatherData.title);
    }
   
    return(
        <div className="alert-box">
            <div onLoad={alertHandler(props.userState)}> { alertStatus }</div>
        </div>
    )
}

export default Alert;