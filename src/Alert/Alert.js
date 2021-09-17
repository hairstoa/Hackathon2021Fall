import React, {useState} from "react";
import "./Alert.css";

function Alert() {

    const [alertStatus, setAlertStatus] = useState("No alerts.");

    const alertHandler = (userState) => {
        let uri = "https://api.weather.gov/alerts/active?area=" + userState;
        fetch(uri).then(response => {
            return response.json()
        }).then(weatherData => {
            setAlertStatus(weatherData.title);
        });
    }
   
    
    return(
        <div className="alert-box">
            <div onLoad={alertHandler}> { alertStatus }</div>
        </div>
    )
}

export default Alert;