import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Rome from '../Room/Rome';
import './Rooms.css'

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/rooms')
        .then(res => res.json())
        .then(data =>{
            setRooms(data);
            console.log(data);
        })
    },[])
    return (
        <div>
            <h3>Home</h3>
            <div className="">
                 <Rome room ={ rooms} />
            </div> 
            
        </div>
    );
};

export default AllRooms;