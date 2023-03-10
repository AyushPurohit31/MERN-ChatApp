import { Container, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const Homepage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const navigate = useNavigate();
    useEffect(()=>{
        const user= JSON.parse(localStorage.getItem("userInfo"));

        if(!user){
            navigate("/chats")
        }
    }, [navigate]);

  return (
    <Container maxWidth = "sm" >
      <Box 
        style={{
            display: "flex",
            justifyContent : "center",
            width : "100%",
            padding : "3",
            margin : "100px 0 15px 0",
            color : "white",
            border : "1px solid white",
            borderRadius : "10px"
        }}
      >
        <Typography fontSize="40px">WhatsChat</Typography>
      </Box>
      <Box style={{
          color : "black",
          backgroundColor : "white",
          borderRadius : "10px"
      }}>
        <Box style={{
              display : "flex",
              justifyContent : "space-around",
            }}>
              <Tabs style={{borderRadius:10, padding: "20px"}} value={value} onChange={handleChange}>
                <Tab 
                label="Login" 
                style={{
                  padding : "0px 90px 0 90px",
                  backgroundColor : "white",
                  color : "black"
                  }}
                />
                <Tab label="Sign Up" style={{padding : "0px 90px 0 90px", backgroundColor : "white"}}/>
              </Tabs>
            </Box>
            {value===0 && <Login/>}
            {value===1 && <Signup/>}
        </Box>
    </Container>
  )
}

export default Homepage
