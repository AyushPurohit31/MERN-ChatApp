import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { ChatState } from '../../Context/chatProvider'
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  const {selectedChat} = ChatState();
  return (
   <Box
   sx={{
    display : {
      md : "flex",
      sm : selectedChat ? "flex" : "none",
      xs : selectedChat ? "flex" : "none"
    },
    flexDirection : "column",
    marginRight : "20px",
    alignItems : "center",
    padding: "0 10px",
    backgroundColor : "rgba(0,0,0,0.5)",
    color : "white",
    width : {
      xs : "100%",
      md : "68%",
      sm : "100%"
    },
    border : "solid white",
    borderRadius : "10px",
    borderWidth : "5px"
  }}
   >
    <SingleChat fetchAgain = {fetchAgain} setFetchAgain = {setFetchAgain}/>
   </Box>
  )
}

export default ChatBox
