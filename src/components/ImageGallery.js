import React from 'react';

const swshImages = require.context('../assets/swsh', true);
const swShImageList = swshImages.keys().map(function(image) {
    return [swshImages(image), image];
});
const sv1Images = require.context('../assets/sv', true);
const sv1ImageList = sv1Images.keys().map(function(image) {
    return [sv1Images(image), image];
});
const smImages = require.context('../assets/sm', true);
const smImageList = smImages.keys().map(function(image) {
    return [smImages(image), image];
});
const xyImages = require.context('../assets/xy', true);
const xyImageList = xyImages.keys().map(function(image) {
    return [xyImages(image), image];
});
const baseImages = require.context('../assets/base', true);
const baseImageList = baseImages.keys().map(function(image) {
    return [baseImages(image), image];
});
const bwImages = require.context('../assets/bw', true);
const bwImageList = bwImages.keys().map(function(image) {
    return [bwImages(image), image];
});
const dpImages = require.context('../assets/dp', true);
const dpImageList = dpImages.keys().map(function(image) {
    return [dpImages(image), image];
});
const exImages = require.context('../assets/ex', true);
const exImageList = exImages.keys().map(function(image) {
    return [exImages(image), image];
});
const hgssImages = require.context('../assets/hgss', true);
const hgssImageList = hgssImages.keys().map(function(image) {
    return [hgssImages(image), image];
});
const plImages = require.context('../assets/pl', true);
const plImageList = plImages.keys().map(function(image) {
    return [plImages(image), image];
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
                <h2 className="image-gallery-recents-header">Recent Emblems</h2>
            <div className="recents">
                {logoHistoryList}
            </div>

            <div className="image-gallery-logo-selection">
                <p className="gallery-section-header">Scarlet & Violet</p>
                    <div className="gallery-section">
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
                    </div>
                <p className="gallery-section-header">Sword & Shield</p>
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

                <p className="gallery-section-header">Sun & Moon</p>
                <div className="gallery-section">
                    {smImageList.map(function(image, index) {
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

                <p className="gallery-section-header">XY</p>
                <div className="gallery-section">
                    {xyImageList.map(function(image, index) {
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

                <p className="gallery-section-header">Black & White</p>
                <div className="gallery-section">
                    {bwImageList.map(function(image, index) {
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

                <p className="gallery-section-header">HeartGold & SoulSilver</p>
                <div className="gallery-section">
                    {hgssImageList.map(function(image, index) {
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

                <p className="gallery-section-header">Platinum</p>
                <div className="gallery-section">
                    {plImageList.map(function(image, index) {
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

                <p className="gallery-section-header">Diamond & Pearl</p>
                <div className="gallery-section">
                    {dpImageList.map(function(image, index) {
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

                <p className="gallery-section-header">EX</p>
                <div className="gallery-section">
                    {exImageList.map(function(image, index) {
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

                <p className="gallery-section-header">Original</p>
                <div className="gallery-section">
                    {baseImageList.map(function(image, index) {
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