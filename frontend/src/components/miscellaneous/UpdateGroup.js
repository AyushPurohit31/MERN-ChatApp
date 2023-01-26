import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ChatState } from '../../Context/chatProvider';
import UserBadge from '../UserAvatar/UserBadge';
import { CircularProgress, Input } from '@mui/material';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #38B2AC',
  boxShadow: 24,
  p: 1.5,
};

export default function UpgradeModal({ children, fetchMessages, fetchAgain, setFetchAgain }) {

  const { selectedChat, setSelectedChat, user} = ChatState();
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = React.useState();
  const [search, setSearch] = React.useState();
  const [searchResult, setSearchResult] = React.useState();
  const [loading ,setLoading] = React.useState(false);
  const [renameLoading, setRenameLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove = async(user1) =>{
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert("Only admins can remove someone!")
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      (user1._id === user._id)? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      alert("error occured")
      setLoading(false);
    }
  };

  const addToGroup = async (user1) =>{
    if(selectedChat.users.find((u)=>(u._id === user1._id))){
      alert("This user is already in the group!");
      return;
    }
    if(selectedChat.groupAdmin._id !== user._id){
      alert("Only admin can add users!")
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      alert("Error occured!")
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("error")
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
        alert("error")
      setRenameLoading(false);
    };
    setGroupChatName("");
}
  return (
    <div>
        <span onClick={handleOpen}>{children}</span>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box
                sx={{display : "flex", width : "100%", justifyContent: "center", margin : "0 10px 10px"}}
            >
                <Typography fontFamily = "cursive" fontSize = "35px" id="modal-modal-title" variant="h6" component="h2">
                {selectedChat.chatName}
                </Typography>
            </Box>
          <Box>
            {selectedChat.users.map((user)=>(
                <UserBadge key={user._id} user = {user} handleFunction={()=>handleRemove(user)}/>
            ))}
          </Box>
          <Input 
            value={groupChatName}
            onChange= {(e)=>setGroupChatName(e.target.value)}
            sx={{width : "95%", margin : "10px"}} 
            placeholder='Rename group' 
            endAdornment = {
                <Button 
                onClick={handleRename}
                variant='contained'
                sx={{
                    '&:hover': {
                        backgroundColor: '#9c27b0'
                        },
                    display : "flex",
                    textTransform : "none",
                    backgroundColor : "#38B2AC",
                    color : "white",
                    margin : "5px"
                }}
                >Update</Button>
            }
          />
          <Input 
            sx={{width : "95%", margin : "10px"}} 
            placeholder='Add users' 
            onChange={(e)=>{handleSearch(e.target.value)}}
          />

            {loading?(<CircularProgress sx={{margin : "10px"}} color="secondary" />):(
              searchResult?.map((user)=>(
                    <UserListItem
                      key={user._id}
                      user = {user}
                      handleFunction = {()=>addToGroup(user)}
                    />
              ))
            )}

          <Button 
          onClick={()=>handleRemove(user)}
          variant='contained'
          sx={{
              '&:hover': {
                  backgroundColor: '#de3131'
                  },
                  left : "40%",
              textTransform : "none",
              backgroundColor : "#38B2AC",
              color : "white",
              margin : "5px"
          }}
          >leave</Button>
        </Box>
      </Modal>
    </div>
  );
}