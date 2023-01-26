import { Button, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiPlus, BiPlusCircle, BiPlusMedical } from 'react-icons/bi';
import { ChatState } from '../../Context/chatProvider'
import { getSender } from '../config/ChatLogic';
import ChatLoading from "../miscellaneous/ChatLoading";
import GroupChatModal from './GroupChatModal';

const MyChats = ({fetchAgain}) => {

  const {user, selectedChat, setSelectedChat, chats, setChats} = ChatState();
  const [loggeduser, setLoggedUser] = useState();
  
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      alert("Error occured!")
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <Box
      sx={{
        display : {
          md : "flex",
          sm : selectedChat ? "none" : "flex",
          xs : selectedChat ? "none" : "flex"
        },
        flexDirection : "column",
        marginRight : "20px",
        alignItems : "center",
        padding: "0 20px",
        backgroundColor : "white",
        width : {
          xs : "100%",
          md : "27%",
          sm : "100%"
        },
        borderRadius : "10px",
        borderWidth : "1px"
      }}
    >
      <Box
        sx={{
          display : "flex",
          alignItems : "center",
          fontSize : "30px",
          width : "100%",
          justifyContent : "space-between",
          fontFamily : "sans-serif",
          padding : "20px",
        }}
      >
        My Chats
        <GroupChatModal/>
      </Box>

      <Box
       sx={{
        dislay : "flex",
        flexDirection : "column",
        padding :"20px",
        width : "100%",
        backgroundColor : "#F8F8F8",
        height : "100%",
        borderRadius : "10px",
        overflow : "hidden"
       }}
      >
        {(chats)?(
          <Stack>
            {chats.map((chat)=>(
              <Box
              onClick = {()=>setSelectedChat(chat)}
                sx={{
                  backgroundColor : (selectedChat===chat)?"#38B2AC":"#E8E8E8",
                  color : (selectedChat===chat)?"white":"black",
                  margin : "5px",
                  cursor : "pointer",
                  padding : "20px 10px",
                  borderRadius : "10px",
                  '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
                key = {chat._id}
              >
                <Typography>
                  {(!chat.isGroupChat)?(
                    getSender(loggeduser, chat.users)
                  ):(chat.chatName)}
                </Typography>

              </Box>
            ))}
          </Stack>
        ):(
          <ChatLoading/>
        )}
      </Box>
    </Box>
  )
}

export default MyChats
