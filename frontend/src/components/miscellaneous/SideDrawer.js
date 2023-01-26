import { Avatar, Button, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { BiSearchAlt, BiChevronDown } from 'react-icons/bi';
import { AiFillBell } from 'react-icons/ai';
import { ChatState } from '../../Context/chatProvider';
import BasicModal from './Model';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar';


const SideDrawer = () => {
    const { user } = ChatState();
    const navigate = useNavigate();

      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      
      const logoutHandler = () =>{
        localStorage.removeItem("userInfo");
        navigate('/');
      }
  return (
        <Box sx={{
            display : "flex",
            justifyContent : "space-around",
            alignItems : "center",
            backgroundColor : "white",
            width : "100%",
            padding : "5px, 10px, 5px, 10px",
            borderWidth : "5px",
        }}>
            <SideBar/>
            <Typography variant='h4' fontFamily="cursive">WhatsChat</Typography>
            <div>
                <Button>
                    <AiFillBell style={{ width : "20px", height : "20px"}}/>
                </Button>
                <Menu>

                </Menu>

                <Button
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar style={{cursor : "pointer"}} alt = {user.name} src = {user.pic}/>
                  <BiChevronDown style={{ width : "30px", height : "30px"}}/>
                </Button>
                <Menu 
                   anchorEl={anchorEl}
                   id="account-menu"
                   open={open}
                   onClose={handleClose}
                   onClick={handleClose}
                   keepMounted
                >
                 <BasicModal user = {user} ><MenuItem>Profile</MenuItem></BasicModal>
                    
                    <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                </Menu>
            </div>
        </Box>
  )
}

export default SideDrawer
