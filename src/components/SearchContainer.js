import React from 'react';

export default function SearchContainer(props) {

    return (
        <div className="card-data">
            <p className="card-data-p">Pokemon ID (I.E. xxx/xxx)</p>
            <input type="number" name="id" onChange={props.handleInputChange} />
            <button type="button" onClick={props.handleInputSubmit}>Search</button>
        </div>
    )
}