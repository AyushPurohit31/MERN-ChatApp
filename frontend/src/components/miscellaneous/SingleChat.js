import styled from '@emotion/styled';
import { Button, CircularProgress, FormControl, IconButton, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiArrowBack, BiInfoCircle, BiUserCircle } from 'react-icons/bi';
import { ChatState } from '../../Context/chatProvider'
import { getSender, getSenderFull} from '../config/ChatLogic';
import BasicModal from './Model';
import ScrollableChat from './ScrollableChat';
import UpgradeModal from './UpdateGroup';
import io from "socket.io-client"
import "./scroll.css"
import Lottie from "react-lottie"
import animationData from "../../animations/typing.json";

const ENDPOINT = "https://mern-chatapp-production.up.railway.app/";
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const {user, selectedChat, setSelectedChat, notification, setNotification} = ChatState();
    const [socketConnected, setSocketconnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

    const CustomMessages = styled('div')({
        display : "flex",
        flexDirection : "column",
        overflowY : "scroll",
        scrollbarWidth : "none"
    })

    const fetchMessages = async () => {
        if (!selectedChat) return;
    
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
    
          setLoading(true);
    
          const { data } = await axios.get(
            `/api/message/${selectedChat._id}`,
            config
          );
          setMessages(data);
          setLoading(false);
          socket.emit("join chat", selectedChat._id);
        } catch (error) {
          alert("Error");
        }
      };

    const sendMessage = async(event)=>{
        if(event.key === "Enter" && newMessage){
            socket.emit("stop typing", selectedChat._id)
            try {
                const config = {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              };
              setNewMessage("");
              const { data } = await axios.post(
                "/api/message",
                {
                  content: newMessage,
                  chatId: selectedChat,
                },
                config
              );
              socket.emit("new message", data);
              setMessages([...messages, data]);
            } catch (error) {
              alert("Error");
              };
            }
        }

        useEffect(()=>{
            socket = io(ENDPOINT);
            socket.emit("setup", user);
            socket.on("connected", ()=>setSocketconnected(true))
            socket.on("typing", ()=>setIsTyping(true));
            socket.on("stop typing", ()=>setIsTyping(false));
        },[])

        useEffect(() => {
            fetchMessages();
            selectedChatCompare = selectedChat;
          }, [selectedChat]);

          console.log(notification, "--------------------------------------")
          useEffect(()=>{
            socket.on("message recieved", (newMessageRecieved)=>{
                if(!selectedChatCompare || selectedChatCompare._id!==newMessageRecieved.chat._id){
                    if(!notification.includes(newMessageRecieved)){
                        setNotification([newMessageRecieved, ...notification]);
                        setFetchAgain(!fetchAgain);
                    }
                }else{
                    setMessages([...messages, newMessageRecieved]);
                }
            })
          })
          
          const typingHandler = (e)=>{
            setNewMessage(e.target.value);
    
            if(!socketConnected)return;
    
            if(!typing){
                setTyping(true);
                socket.emit("typing", selectedChat._id);
            }

            let lastTypingTime = new Date().getTime();
            var timerLength = 3000;
            setTimeout(() => {
                var timeNow = new Date().getTime();
                var timeDff = timeNow-lastTypingTime;
            
                if(timeDff >= timerLength && typing){
                    socket.emit("stop typing", selectedChat._id);
                    setTyping(false);
                }
            }, timerLength);
        }
    
  return (
    (selectedChat)?(
        <>
            {!selectedChat.isGroupChat ? (
                //when one to one chat
                <Box sx={{
                    padding : "0 20px",
                    width:"95%",
                    display:"flex",
                    justifyContent : "space-between",
                    backgroundColor : "transparent",
                    color : "white",
                    marginTop : "10px",
                    borderBottom : "1px solid rgba(255, 255, 255, .5)"
                }}>
                    <IconButton sx={{
                        color : "white",
                        display :{
                            xs : "flex",
                            sm : "flex",
                            md : "none"
                        },
                        cursor : "pointer", padding : "5px", width : "35px", height : "35px"
                    }}
                    onClick={()=>setSelectedChat("")}
                    >
                        <BiArrowBack/>
                    </IconButton>
                    <Typography fontSize={30} fontFamily="sans-serif">{getSender(user, selectedChat.users)}</Typography>
                    <IconButton>
                        <BasicModal user = {getSenderFull(user, selectedChat.users)}>
                            <BiUserCircle style={{cursor : "pointer", width : "35px", height : "35px", color : "white",}}/>
                        </BasicModal>
                    </IconButton>
                </Box>
                ):(
                    //when group chat
                    <Box sx={{
                        padding : "0 20px",
                        width:"95%",
                        display:"flex",
                        justifyContent : "space-between",
                        backgroundColor : "transparent",
                        color : 'white',
                        marginTop : "10px",
                        borderBottom : "1px solid rgba(255, 255, 255, .5)"
                    }}>
                        <IconButton sx={{
                            color : "white",
                            display :{
                                xs : "flex",
                                sm : "flex",
                                md : "none"
                            },
                            cursor : "pointer", padding : "5px", width : "35px", height : "35px"
                        }}
                        onClick={()=>setSelectedChat("")}
                        >
                            <BiArrowBack/>
                        </IconButton>
                        <Typography fontSize={30} fontFamily="sans-serif">{selectedChat.chatName}</Typography>
                        <IconButton >
                            <UpgradeModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages = {fetchMessages}>
                                <BiInfoCircle
                                    style={{cursor : "pointer", width : "35px", height : "35px", color : "white",}}
                                />
                            </UpgradeModal>
                        </IconButton>
                    </Box>
                )
            }
            <Box sx={{
                display : "flex",
                flexDirection : "column",
                backgroundColor : "transparent",
                width : "100%",
                height : "100%",
                borderRadius : "10px",
                justifyContent : "flex-end",
                overflowY : "hidden",
                scrollbarWidth : "none",
                margin : "10px"
            }}>
                    {loading? (<CircularProgress size="5rem" thickness="1.6" sx={{alignSelf : "center", margin : "auto", color : "white"}}/>) :(
                        <CustomMessages className='custom'>
                            <ScrollableChat messages = {messages}/>
                        </CustomMessages>
                    )}
                    <FormControl onKeyDown = {sendMessage}>
                        {isTyping?<div>
                            <Lottie
                            options={defaultOptions}
                            width={70}
                            style= {{margin : "10px"}}
                            />
                        </div>:(<></>)}
                        <OutlinedInput 
                        placeholder='Write message'
                        required 
                        onChange={typingHandler}
                        value = {newMessage}
                        sx={{
                            marginTop : "5px",
                            fontSize : "1rem",
                            borderColor : "white",
                            backgroundColor : "white",
                            borderRadius : "10px",
                        }}/>
                    </FormControl>
            </Box>
        </>
    ):(
        <Box sx={{
            display:"flex",
            alignItems : "center",
            justifyContent : "center",
            height : "100%"
        }}>
            <Typography variant="h4" color="white" fontFamily="cursive">Click on any user to chat</Typography>
        </Box>
    )
  )
}

export default SingleChat
