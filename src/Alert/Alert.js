import React, {useState, useEffect} from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "./Alert.css";

function Alert(props) {

    const [alertStatus, setAlertStatus] = useState("Test");

    async function alertHandler(userState, userFIP) {
        if (userState !== null & userFIP !== null){
            let uri = "https://api.weather.gov/alerts/active?area=" + userState;
            const response = await fetch(uri);
            const weatherData = await response.json();
            // Filter the results for warnings with matching FIPS to the users location
            const filteredContent = weatherData.features
            .filter(alert => {
                const formatFIP = "0" + userFIP;
                return alert.properties.geocode.SAME && alert.properties.geocode.SAME.includes(formatFIP);
            })
            .map((element, index) => {
                return  (
                    <Accordion.Item key ={index} eventKey={index} >
                        <Accordion.Header>Alert: {element.properties.areaDesc}</Accordion.Header>
                        <Accordion.Body className="alert-box">
                            {element.properties.description}
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })
            setAlertStatus(filteredContent);
        }
        else {
            setAlertStatus("");
        }
    }
    useEffect(() => {
        alertHandler(props.userState, props.userFIP);
    }, [props.userState, props.userFIP]);



    let alertContent =  ( alertStatus.length && alertStatus.length > 0)? alertStatus : <p className = 'text'> There are no current weather alerts for your region. </p>;
   
    return(
    <div className="alert-box">
        <Container fluid style={{width: "70%"}}>
            <Row>
                <Col>
                    <Accordion >
                        { alertContent }
                    </Accordion>
                </Col>
            </Row>
        </Container>    
    </div>
    )
}

export default Alert;