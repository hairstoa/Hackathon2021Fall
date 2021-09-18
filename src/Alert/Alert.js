import React, {useState} from "react";
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
        console.log(filteredContent);
        setAlertStatus(weatherData.title);
    }
    
    alertHandler(props.userState, props.userFIP);

    const filteredContent = alertStatus;

    // For each of the FIPS in the alert, check if the userFIP is listed
    // const matchFIPS = (alertLocations, userFIP) => { 
    //     // Add a zero to the front of the userFIP because for some reason that is how it is formatted 
    //     // in the JSON returned from weather API
    //     const formatFIP = "0" + userFIP;
    //     return alertLocations.geocode.SAME && alertLocations.geocode.SAME.includes(formatFIP);
    // }
    let alertContent =  (filteredContent.length > 0)? filteredContent : <p> There are no current weather alerts for your region. </p>;
   
    return(
        <div className="alert-box">
            {/* <div onLoad={ () => { alertHandler(props.userState, props.userFIP) } }> { alertStatus }</div> */}
            { alertContent }
        </div>
    )
}

export default Alert;