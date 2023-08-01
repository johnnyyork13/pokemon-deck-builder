import React from 'react';
import example from '../assets/help/example.png'

export default function Help(props) {

    return (
        <div className="help-background">
            <div className="help-container-one">
                <button className="help-close-btn" onClick={props.toggleShowHelp}>Close Help</button>
                <h1 className="help-header">How to Search for Pokémon Cards</h1>
                <div className="help-container-two">
                    <img src={example} alt="Pokemon Card" />
                    <div className="help-information">
                        <h2>1. Reference the Logo</h2>
                        <p>On one of the (typically) bottom corners of the card resides a logo.
                            This logo represents the card's set and will be used to locate the exact card.
                        </p>
                        <h2>2. Find the Logo in the Sidebar</h2>
                        <p>Navigate through the left sidebar until the referenced logo is located. Click on
                            it and then proceed to the third step.
                        </p>
                        <h2>3. Enter the Card's Set ID</h2>
                        <p>Enter the ID of the card into the text box. This can also be
                            generally found on one of the bottom corners.
                        </p>
                        <h2>4. Search!</h2>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}