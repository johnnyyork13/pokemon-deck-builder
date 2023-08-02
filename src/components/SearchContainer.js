import React from 'react';

let backupEventHandlerTarget;

export default function SearchContainer(props) {

    return (
        <div className="card-data">
            <p className="card-data-p">Pokémon ID (I.E. xxx/xxx)</p>
            <input type="text" name="id" onChange={function(e) {backupEventHandlerTarget = e; props.handleInputChange(e)}} onKeyDown={function(e) {if (e.keyCode === 13) {props.handleInputSubmit()}}}/>
            <button type="button" className="main-button" onClick={function(e) {props.handleInputChange(backupEventHandlerTarget); props.handleInputSubmit(e)}}>Search</button>
        </div>
    )
}