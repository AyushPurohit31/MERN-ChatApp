import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiFillBell } from 'react-icons/ai';
import { ChatState } from '../../Context/chatProvider';
import { Typography } from '@mui/material';
import { getSender } from '../config/ChatLogic';
import NotificationBadge, { Effect } from 'react-notification-badge';

export default function NotificationMenu() {
  const { notification, setNotification, setSelectedChat, user } = ChatState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <NotificationBadge 
        count={notification.length}
        effect = {Effect.SCALE}
        />
        <AiFillBell style={{ width : "40px", height : "40px"}}/>
      </Button>
      <Menu
        style={{
            margin : "10px"
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!notification.length?(<Typography sx={{padding : "10px"}}>No new notification</Typography>):(
            notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))
        )}
        
      </Menu>
    </div>
  );
}