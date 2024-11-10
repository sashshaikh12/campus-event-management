import React, {useState, useEffect} from "react";

var images = [
    {
        id : "1",
        url: "/alcoding.jpeg",
    },
    {
        id : "2",
        url: "/innovation lab.jpeg",
    },
    {
        id : "3",
        url: "/hopes.jpeg",
    },
];

function Slider() 
{

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('slide-in');

    useEffect(() => {
        setTimeout(() => {
            if(animationClass === 'slide-out') {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setAnimationClass('slide-in');
            }
            else {
                setAnimationClass('slide-out');
            }
        }, 1900);
    }, [animationClass]);

    console.log(animationClass);

    return(

        <div className="SliderBox">
            <img
                className={`SliderImgs ${animationClass}`}
                key={images[currentImageIndex].id}
                src={images[currentImageIndex].url}
                alt="slider images"
            />
        </div>

    );
}

export default Slider;