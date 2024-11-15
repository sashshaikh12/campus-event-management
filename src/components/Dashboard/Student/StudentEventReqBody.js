import React, {useState, useEffect} from "react";

function StudentEventReqBody({SeeDetails}) {

    const [images, setImages] = useState([]);

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
                console.log(result);

                setImages(result);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchImages();
    }, []);

    console.log(images);

    return (
        <div>
            {/* <div className="EventTitle">
                <h1>Upcoming Events : </h1>
            </div> */}
            <div className="EventCardsContainer">
            {images.map((image, index) => (
                <div key={index} className="EventCard">
                    <div className="EventCardImage">
                        <img src={image.URL} alt="Event" />
                    </div>
                    <button className="EventCardButton" onClick = {() => SeeDetails(image)} >See Details</button>
                </div>
            ))}
        </div>
        </div>
    );
}

export default StudentEventReqBody;