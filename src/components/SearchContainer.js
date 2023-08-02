import React from 'react';

export default function SearchContainer(props) {

    return (
        <div className="card-data">
            <p className="card-data-p">Pokemon ID (I.E. xxx/xxx)</p>
            <input type="text" name="id" onChange={props.handleInputChange} onKeyDown={function(e) {if (e.keyCode === 13) {props.handleInputSubmit()}}}/>
            <button type="button" className="main-button" onClick={props.handleInputSubmit}>Search</button>
        </div>
    )
}