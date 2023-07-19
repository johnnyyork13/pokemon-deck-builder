import React from 'react';

const images = require.context('../../poke-assets', true);
const imageList = images.keys().map(function(image) {
    return [images(image), image];
});
export default function ImageGallery(props) {

    return (
        <div className="image-gallery">
            {imageList.map(function(image, index) {
                return <img 
                    className="logo"
                    key={index} 
                    alt="Pokemon Set Logo" 
                    src={image[0]} 
                    onClick={() => props.handleLogoClick(image)}
                    />
            })
            }
        </div>
    )
}