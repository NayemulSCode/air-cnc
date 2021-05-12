import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import AllRooms from '../AllRooms/AllRooms';
import Booking from '../Bokking/Booking';
import './Home.css'
const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="row">
                <div className="col-md-4">
                    <Booking  />
                </div>
                <div className="col-md-8">
                    <AllRooms  />
                </div>
            </div>
            
        </div>
    );
};

export default Home;