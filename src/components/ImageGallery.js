import React from 'react';

const swshImages = require.context('../../poke-assets/swsh', true);
const swShImageList = swshImages.keys().map(function(image) {
    return [swshImages(image), image];
});
const sv1Images = require.context('../../poke-assets/sv', true);
const sv1ImageList = sv1Images.keys().map(function(image) {
    return [sv1Images(image), image];
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

        function toggleHoverEnter(e) {
            e.target.nextSibling.style.border = "2px solid black";
        }

        function toggleHoverExit(e) {
            e.target.nextSibling.style.border = "2px solid rgba(0,0,0,0)";
        }

        return (
                <div key={`recents-div-${index}`} className="recents-div">
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
                <h2 className="image-gallery-recents-header">Recents</h2>
            <div className="recents">
                {logoHistoryList}
            </div>
            <div className="image-gallery-logo-selection">
                <p className="gallery-section-header">Scarlet & Violet</p>
                    {sv1ImageList.map(function(image, index) {
                            return <img 
                                className="image-gallery-logo image-gallery-all"
                                key={index} 
                                alt="Pokemon Set Logo" 
                                src={image[0]} 
                                onClick={() => {props.handleLogoClick(image); handleUpdateHistory(image);}}
                                />
                            })
                        }
                <p className="gallery-section-header">Sword and Shield</p>
                <div className="gallery-section">
                    {swShImageList.map(function(image, index) {
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
                
            </div>
        </div>
    )
}