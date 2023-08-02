import React from 'react';

export default function ZoomCard(props) {

    return (
        <div className="zoom-card-background">
            <div className="zoom-card-container">
                <button className="main-button" onClick={() => props.toggleShowZoom("")}>Close Zoom</button>
                <img src={props.img} alt="Pokemon Card Large" onClick={() => props.toggleShowZoom("")}/>
            </div>
        </div>
    )
}