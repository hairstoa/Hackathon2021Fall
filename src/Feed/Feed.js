import React from "react";
import { Carousel } from "react-bootstrap";
import tips from "./DroughtTips";
import bkgImage from './1d1d1d.jpeg';


import "./Feed.css";

function Feed(props) {
    return(
        <div className="feed-box">
            <h3> Drought Tips </h3>
            <p> From the American Red Cross</p>
            <Carousel>
            {tips.tips.filter(element => element.Dx === props.dn)
                .map( e => {
                    return (
                        <Carousel.Item key={e.id}>
                            <img
                                className="d-block w-100"
                                src={ bkgImage }
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h5>{ e.Msg }</h5>
                            </Carousel.Caption>
                    </Carousel.Item>)
                })}
            </Carousel>
        </div>
    )
}

export default Feed;