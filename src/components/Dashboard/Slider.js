import React, { useState, useEffect } from "react";

function Slider() {
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('slide-in');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                let result = await fetch("http://localhost:5000/studentDash", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();

                setImages(result);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchImages();
    }, []);

    console.log(images);
    useEffect(() => {
        if (images.length > 0) {
            setTimeout(() => {
                if (animationClass === 'slide-out') {
                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                    setAnimationClass('slide-in');
                } else {
                    setAnimationClass('slide-out');
                }
            }, 1900);
        }
    }, [animationClass, images.length]);

    return (
        <div className="SliderBox">
            {images.length > 0 && (
                <img
                    className={`SliderImgs ${animationClass}`}
                    key={images[currentImageIndex].Event_ID}
                    src={images[currentImageIndex].url}
                    alt="slider images"
                />
            )}
        </div>
    );
}

export default Slider;
