import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from "moment";
import { useParams } from 'react-router';
import { IoIosArrowDown } from "react-icons/io";
import Button from '@material-ui/core/Button';
// table from
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
// date pickerform
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
// form control
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 243,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
// end from control


const RoomDetails = () => {
    const {id} = useParams();
    const [room, setRoom] = useState([]);
    const classes = useStyles();
    const [guests, setGuests] = useState('');
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });
    
    const handleCheckInDate = (date) => {
      const newDates = {...selectedDate}
      newDates.checkIn = date;
      setSelectedDate(newDates);
    };
    const handleCheckOutDate = (date) => {
        const newDates = {...selectedDate}
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };
    // find difference between days
    const calculateDayLeft = (checkIn, checkOut) =>{
        if(!moment.isMoment(checkIn)) checkIn = moment(checkIn);
        if(!moment.isMoment(checkOut)) checkOut= moment(checkOut);

        return checkOut.diff(checkIn, "days");
    }
    const {checkIn,checkOut} = selectedDate;
    const days = calculateDayLeft(checkIn, checkOut);
    console.log(days,"days");
    // find difference between days function end

    // calculate total amount
    let totalAmount = 0, cleanFee = 0,serviceFee= 0,grandTotal = 0;
    totalAmount += (room.price)* days; 
    cleanFee = cleanFee + days*100;
    serviceFee += days*60;
    grandTotal = totalAmount + cleanFee + serviceFee;
    // calculate total end
    const handleGuestChange = (event) => {
        setGuests(event.target.value);
      console.log(guests);
    };
    console.log(guests);
    const handleBooking = () =>{
        const newBooking = { 
            guests: guests,
            ...selectedDate,
            hotelName: room.hName,
            reservedCost: grandTotal,
            paymentStatus: 'pending',
            reservedTime: new Date()

        }
        console.log(newBooking);
    }
    useEffect(()=>{
        fetch(`http://localhost:5000/rooms/${id}`)
        .then(res => res.json())
        .then(data => {
            setRoom(data);
            console.log(data)
        })
    },[])
    return (
        <div>
            {
                room.image ? <img style={{width:"100%", height: '300px'}} src={`data:image/png;base64,${room.image.img}`}/>
                :
            <img style={{height: '300px'}} className="img-fluid mb-3" src={`http://localhost:5000/rooms${room.img}`} alt=""/>
            }
            <div className="container d-flex justify-content-between">
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-9">
                            <h2>{room.hName}</h2>
                        </div>
                        <div className="col-md-3">
                            <img src="" alt="user image"/>
                        </div>
                    </div>
                    <p>{room.nOfGuest}<small> guests</small> | {room.nOfRoom}<small> rooms</small> | {room.nOfBed} <small> beds</small> | {room.nOfBath}<small> baths</small></p>
                    <hr/>
                        <h3>Features</h3>
                        <p>{room.feature}</p>
                    <hr/>
                    <h3>Description</h3>
                    <p>{room.description}</p>
                    <Button style={{color:'green'}} >Red more about space <IoIosArrowDown style={{marginLeft:'5px'}} />
                       </Button>
                    <hr/>
                    <h3><strong>Reviews</strong></h3>
                    <p>4.9(5) reviews</p>
                </div>
                <div className="col-md-5 shadow-lg mx-3 px-4 py-4 text-left">
                    <h4><strong>{room.price}<span style={{fontSize:"30px", fontWeight:'bold'}}>&#2547;</span></strong>/days</h4> 
                        
                        {/* date picker */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-between">
                                <KeyboardDatePicker
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Check In Date(Start)"
                                value={selectedDate.checkIn}
                                onChange={handleCheckInDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Check Out Date(End)"
                                format="dd/MM/yyyy"
                                value={selectedDate.checkOut}
                                onChange={handleCheckOutDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        {/* date picker end */}
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Guests</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={guests}
                            onChange={handleGuestChange}
                            >
                                <MenuItem value={2}>2 guests</MenuItem>
                                <MenuItem value={3}>3 guests</MenuItem>
                                <MenuItem value={4}>4 guests</MenuItem>
                                <MenuItem value={5}>5 guests</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <TableContainer component={Paper}>
                            <Table className="" aria-label="spanning table">
                                <TableBody>
                                    <TableRow rowSpan={2}>
                                        <TableCell>{room.price} x {days} Days</TableCell>
                                        <TableCell align="right">{totalAmount} &#2547; {}</TableCell>
                                    </TableRow>
                                    <TableRow rowSpan={2}>
                                        <TableCell>Cleaning Fee</TableCell>
                                        <TableCell align="right">{cleanFee} &#2547; {}</TableCell>
                                    </TableRow>

                                    <TableRow rowSpan={2} >
                                        <TableCell >Service Fee</TableCell>
                                        <TableCell align="right">{serviceFee}&#2547;</TableCell>
                                    </TableRow>
                                    <TableRow rowSpan={2} >
                                        <TableCell ><strong>Total</strong></TableCell>
                                        <TableCell align="right"><strong>{grandTotal}&#2547;</strong></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button onClick={()=>handleBooking()} variant="contained" color="secondary" className="my-4 w-100" >
                             Reserve Now
                        </Button>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;