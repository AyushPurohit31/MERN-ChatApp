import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { BiArrowBack, BiInfoCircle, BiUserCircle } from 'react-icons/bi';
import { ChatState } from '../../Context/chatProvider'
import { getSender, getSenderFull} from '../config/ChatLogic';
import BasicModal from './Model';
import UpgradeModal from './UpdateGroup';

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const {user, selectedChat, setSelectedChat} = ChatState();

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
                            <UpgradeModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
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
                justifyContent : "flex-end",
                backgroundColor : "transparent",
                width : "100%",
                height : "100%",
                borderRadius : "10px",
                overflow : "hidden",
                margin : "10px"
            }}>

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
