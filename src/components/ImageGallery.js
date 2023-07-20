import React from 'react';

const images = require.context('../../poke-assets', true);
const imageList = images.keys().map(function(image) {
    return [images(image), image];
});

let activeIndex;

export default function ImageGallery(props) {


    const [logoHistory, setLogoHistory] = React.useState([]);

    const [clickedRecent, setClickedRecent] = React.useState(true);

    function handleUpdateHistory(image) {
        if (logoHistory.includes(image)) {
            changeActiveRecent(logoHistory.indexOf(image))
        } else {
            changeActiveRecent(0);
        }
        if (logoHistory.length <= 5 && !logoHistory.includes(image)) {
            setLogoHistory((prev) => ([
              image,
              ...prev
            ]))
        } else if (logoHistory.length > 5 && !logoHistory.includes(image)) {
            setLogoHistory(function(prev){ 
              const shifted = prev.slice(0, prev.length - 1);
              return [image, ...shifted]
            })
        }
    }

    function changeActiveRecent(index) {
        activeIndex = index;
        setClickedRecent((prev) => !prev);
    }

    const logoHistoryList = logoHistory.map(function(image, index) {
    
        const leftMargin = 140;

        function toggleHoverEnter(e) {
            e.target.nextSibling.style.border = "5px solid black";
        }

        function toggleHoverExit(e) {
            e.target.nextSibling.style.border = "5px solid rgba(0,0,0,0)";
        }

        return (
                <div key={`recents-div-${index}`} className="recents-div" style={{left: `${index * leftMargin}px`}}>
                    <img 
                        className="image-gallery-logo recents-logo"
                        key={`recent-logo-${index}`} 
                        src={image[0]} 
                        alt="Logo Set Pic" 
                        onClick={() => {props.handleLogoClick(image); handleUpdateHistory(image)}}
                        onMouseEnter={toggleHoverEnter}
                        onMouseLeave={toggleHoverExit}
                    />
                    <div 
                        key={`active-${index}`} 
                        className={activeIndex === index ? "recents-all recents-active" : "recents-all"} 
                        onClick={() => changeActiveRecent(index)}>

                    </div>
                </div>
                
        )
                  
      })

    

    return (
        <div className="image-gallery">
            <div className="recents">
                <h1>Recents</h1>
                {logoHistoryList}
            </div>
            {imageList.map(function(image, index) {
                return <img 
                    className="image-gallery-logo image-gallery-all"
                    key={index} 
                    alt="Pokemon Set Logo" 
                    src={image[0]} 
                    onClick={() => {props.handleLogoClick(image); handleUpdateHistory(image);}}
                    />
            })
            }
        </div>
    )
}