import React, {useState, useEffect} from "react";
import "./Alert.css";

function Alert(props) {

    const [alertStatus, setAlertStatus] = useState("Test");

    async function alertHandler(userState, userFIP) {
        let uri = "https://api.weather.gov/alerts/active?area=" + userState;
        const response = await fetch(uri);
        const weatherData = await response.json();
        // Filter the results for warnings with matching FIPS to the users location
        // console.log(weatherData.features);
        const filteredContent = weatherData.features
        .filter(alert => {
            const formatFIP = "0" + userFIP;
            return alert.properties.geocode.SAME && alert.properties.geocode.SAME.includes(formatFIP);
        })
        .map(element => {
            return  <div>{element.properties.description}</div>;
        })
        setAlertStatus(filteredContent);
    }
    useEffect(() => {
        alertHandler(props.userState, props.userFIP);
    }, [props.userState, props.userFIP]);



    let alertContent =  ( alertStatus.length && alertStatus.length > 0)? alertStatus : <p className = 'text'> There are no current weather alerts for your region. </p>;
   
    return(
        <div className="alert-box">
            {alertContent }
        </div>
    )
}

export default Alert;