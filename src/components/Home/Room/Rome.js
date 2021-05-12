import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from 'react-router';
const responsive={
    desktop: {
    breakpoint: {
        max: 3000,
        min: 1024
    },
    items: 3,
    partialVisibilityGutter: 40
    },
    mobile: {
    breakpoint: {
        max: 464,
        min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
    },
    tablet: {
    breakpoint: {
        max: 1024,
        min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
    }
}
const Rome = ({room}) => {
    const history = useHistory()
    const handleRoom = id =>{
        const url = `/roomDetails/${id}`;
        history.push(url);
    }
    return (
        <div className="room-container">
            <Carousel
            responsive={responsive}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                >
                {
                    room.map(room =>{
                        return <div key={room._id} className="carousel__item shadow-sm"  onClick={ () => handleRoom(room._id)}>
                            {
                
                                room.image ? <img style={{height: '200px'}} src={`data:image/png;base64,${room.image.img}`}/>
                                :
                            <img style={{height: '200px'}} className="img-fluid mb-3" src={`http://localhost:5000/rooms${room.img}`} alt=""/>
                            }
                            <div className="carouselItem__body">
                                <h5>{room.hName}</h5>
                                <p>{room.feature}</p>
                                </div>
                           
                        </div>
                    })
                }
            
            </Carousel>
        </div>
    );
};

export default Rome;