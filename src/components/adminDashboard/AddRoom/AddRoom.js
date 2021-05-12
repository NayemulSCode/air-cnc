import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { BiCloudUpload } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
    //   input: {
    //     display: 'none',
    //   },
  }));
  
const AddRoom = () => {
    const [roomInfo, setRoomInfo] = useState({});
    const [file, setFile] = useState(null);
    
    const handleBlur = e =>{
        const newRoomInfo =  {...roomInfo};
        newRoomInfo[e.target.name] = e.target.value;
        setRoomInfo(newRoomInfo)
    }
    const handleFileChange = (e) =>{
        const newFile = e.target.files[0];
        setFile(newFile);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file);
        formData.append('hName', roomInfo.hName);
        formData.append('nOfRoom', roomInfo.nOfRoom);
        formData.append('nOfGuest', roomInfo.nOfGuest);
        formData.append('nOfBed', roomInfo.nOfBed);
        formData.append('nOfBath', roomInfo.nOfBath);
        formData.append('price', roomInfo.price);
        formData.append('tPrice', roomInfo.tPrice);
        formData.append('feature', roomInfo.feature);
        formData.append('description', roomInfo.description);

        fetch('http://localhost:5000/addRoom',{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert('room info added!!')
            console.log(data)
        })
    }

    const classes = useStyles();
    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField onBlur={handleBlur} name="hName" id="outlined-basic" label="Hotel Name" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic"  name="nOfRoom" label="Number of Bed Room" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic" name="nOfGuest" label="Max Allow Guests" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic" name="nOfBed" label="Number of Bed" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic" name="nOfBath" label="Number of Baths" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic" name="price" label="Price of Room" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic" name="tPrice" label="Total Price" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic" name="feature" label="Feature" variant="outlined" />
                <TextField onBlur={handleBlur} id="outlined-basic" name="description" label="Description" variant="outlined" />
               
                {/* <TextField id="outlined-basic" type='file' /> */}
                <>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange = {handleFileChange}
                    />
                    {/* <label htmlFor="contained-button-file">
                        <Button startIcon={<BiCloudUpload />} variant="contained" color="primary" component="span">
                            Upload
                        </Button>
                    </label> */}
                </>
                
                <Button variant="contained" color="secondary" type="submit" >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddRoom;