import React from "react";
import tips from "./DroughtTips";

import "./Feed.css";

function Feed(props) {
    return(
        <div className="feed-box">
            <h3> Drought Tips </h3>
            <ul>
            {tips.tips.filter(element => element.Dx === props.dn)
            .map( e => {
                return <li key={e.id}>{ e.Msg }</li>
            })}
            </ul>
        </div>
    )
}

export default Feed;