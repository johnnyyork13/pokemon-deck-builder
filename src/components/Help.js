import React from 'react';
import example from '../assets/help/example.png'

export default function Help(props) {

    return (
        <div className="help-background">
            <div className="help-container-one">
                <button className="help-close-btn main-button" onClick={props.toggleShowHelp}>Close Help</button>
                <h1 className="help-header">How to Search for Pokémon Cards</h1>
                <div className="help-container-two">
                    <img src={example} alt="Pokemon Card" />
                    <div className="help-information">
                        <h2>1. Reference the Logo</h2>
                        <p>On one of the (typically) bottom corners of the card resides a logo.
                            This logo represents the card's set and will be used to locate the exact card.
                        </p>
                        <h2>2. Find the Logo in the Sidebar</h2>
                        <p>Navigate through the left sidebar until you find the logo. Click on
                            it and then proceed to the third step.
                        </p>
                        <h2>3. Enter the Card's Set ID</h2>
                        <p>Enter the ID of the card into the text box. This can also be
                            generally found on one of the bottom corners. You only need to enter the first part of the ID (The numbers before the "/" symbol).
                            So, for the example card to the left you would enter 001, or just 1.
                        </p>
                        <h2>4. Search!</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}