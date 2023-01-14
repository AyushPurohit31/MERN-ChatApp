import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react'
import { BiShow , BiHide} from 'react-icons/bi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name , setName] = useState();
    const [password , setPassword] = useState();
    const [email , setEmail] = useState();
    const [cnfpassword , setCnfpassword] = useState();
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState();

    const handleClickShowPassword1 = () => {
        if(show1){
            setShow1(false);
        }else{
            setShow1(true)
        }
    }
    const handleClickShowPassword2 = () => {
        if(show2){
            setShow2(false);
        }else{
            setShow2(true)
        }
    }

    const postDetails = (pics)=>{
        setLoading(true);
        if(pics===undefined){
          alert("please upload picture")
        }
        console.log(pics)
        if(pics.type === "image/jpeg" || pics.type === "image||png"){
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "whatschat");
          data.append("cloud_name", "dzfsccvsi");
          fetch("https://api.cloudinary.com/v1_1/dzfsccvsi/image/upload", {
            method : "post", body : data
          }).then((res)=>res.json())
          .then((data)=>{
            setPic(data.url.toString());
            console.log(data.url.toString());
            setLoading(false);
          }).catch((err)=>{
            console.log(err);
            setLoading(false);
          })
        }else{
          alert("Please select an image!")
        }
    }

    const navigate = useNavigate();
    const submitHandler = async()=>{
      
      setLoading(true);
      if(!name || !email ||!password ||!cnfpassword){
        alert('Please fill all the details')
        setLoading(false);
        return;
      }

      if(password !== cnfpassword){
        alert("Passwords do not match")
          return;
      }
      
      try {
        const config = {
          headers : {
            "Content-type" : "application/json",
          },
        };

        const {data} = await axios.post("/api/user", {
          name,email,password,pic}, 
          config
          );

          alert("Registration successful");

          localStorage.setItem('userInfo', JSON.stringify(data));
          setLoading(false);
          navigate("/chat")
      } catch (error) {
        alert("Error occured")
          setLoading(false);
      }
    }

  return (
    <div>
      <Box
        sx={{
          padding : "10px",
          display : "flex",
          flexDirection : "column",
          gap : "20px"
        }}
      >
        <TextField 
        id ="name"
        variant='outlined'
        label="Name"
        value={name}
        onChange= {(e)=>{
          setName(e.target.value);
        }}
        fullWidth
        required
        />   

        <TextField 
        id="email"
        variant='outlined'
        type="email"
        label="Email"
        value={email}
        onChange= {(e)=>{
          setEmail(e.target.value);
        }}
        fullWidth
        required
        />

        <FormControl required id="password">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            style={{
                padding : '0 10px 0 10px'
            }}
            type={show1 ? 'text' : 'password'}
            value={password}
            onChange= {(e)=>{
                    setPassword(e.target.value);
                }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                style={{paddingRight : "10px"}}
                  onClick={handleClickShowPassword1}
                  edge="end"
                >
                  {show1 ? <BiHide /> : <BiShow />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl required id="cnfpassword">
          <InputLabel>Comfirm Password</InputLabel>
          <OutlinedInput
            style={{
                padding : '0 10px 0 10px'
            }}
            type={show2 ? 'text' : 'password'}
            value={cnfpassword}
            onChange= {(e)=>{
                    setCnfpassword(e.target.value);
                }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{paddingRight : "10px"}}
                  onClick={handleClickShowPassword2}
                  edge="end"
                >
                  {show2 ? <BiHide /> : <BiShow />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
        </FormControl>

        <FormControl id="pic">
           <OutlinedInput 
             accept="image/*"
             style={{
              padding : '0 10px 0 10px'
             }}
             type="file"
             onChange= {(e)=>{
              postDetails(e.target.files[0]);
             }}
            />
        <FormHelperText>Upload profile picture</FormHelperText>
        </FormControl>

        <Button 
        variant="contained"
        size="large"
        onClick={submitHandler}
        >Sign up</Button>
      </Box>
    </div>
  )
}

export default Signup
