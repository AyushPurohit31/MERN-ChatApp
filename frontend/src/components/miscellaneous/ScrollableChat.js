import { Avatar, Tooltip, Typography } from '@mui/material';
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../../Context/chatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic';


const ScrollableChat = ({messages}) => {
    const { user } = ChatState();
  return (
    <ScrollableFeed>
        {
            messages && messages.map((m, i)=>(
                <div style={{ display: "flex", margin : "5px", color: "black"}} key={m._id}>
                    {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                    <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                        <Avatar
                        sx={{
                            height : "35px",
                            width : "35px",
                            margin : "5px 2px",
                            cursor:"pointer",
                        }}
                        name={m.sender.name}
                        src={m.sender.pic}
                        />
                    </Tooltip>
                    )}
                    <Typography
                    style={{
                        backgroundColor: `${
                        m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                        }`,
                        fontFamily : "sans-serif",
                        fontSize : "1rem",
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameUser(messages, m, i, user._id) ? 3 : 5,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                    }}
                    >
                    {m.content}
                    </Typography>
                </div>
            ))
        }
    </ScrollableFeed>
  )
}

export default ScrollableChat
