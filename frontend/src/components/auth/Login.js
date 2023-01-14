import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react'
import { BiShow , BiHide} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
        if(show){
            setShow(false);
        }else{
            setShow(true)
        }
  }
  const navigate = useNavigate();
  const submitHandler = async ()=>{
    setLoading(true);
    if (!email || !password) {
      alert("Please Fill all the Fields");
      setLoading(false);
      return;
    }
  
    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      console.log(JSON.stringify(data));
      alert("Login Successful")
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      alert(error)
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
            type={show ? 'text' : 'password'}
            value={password}
            onChange= {(e)=>{
                    setPassword(e.target.value);
                }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                style={{paddingRight : "10px"}}
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {show ? <BiHide /> : <BiShow />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button 
        onClick={submitHandler}
        variant="contained"
            size="large"
        >Login
        </Button>
        </Box>
    </div>
  )
}

export default Login;
