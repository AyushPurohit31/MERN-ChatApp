import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BiPlus } from 'react-icons/bi';
import { ChatState } from '../../Context/chatProvider';
import { CircularProgress, FormControl, TextField } from '@mui/material';
import axios from "axios";
import UserListItem from '../UserAvatar/UserListItem';
import UserBadge from '../UserAvatar/UserBadge';

const style = {
  display : "flex",
  flexDirection : "column",
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 430,
  bgcolor: 'background.paper',
  border: '2px solid #03fce8',
  boxShadow: 24,
  p: 2,
};

export default function GroupChatModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [groupchatName, setGroupchatName] = React.useState();
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const {user ,chats, setChats} = ChatState();

  const handleSearch  = async(query)=>{
    setSearch(query);
    if(!query){
      return;
    }
    try {
      const config = {
        headers : {
          Authorization : `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      alert("Error occured!!")
    }
  }
  const handleSubmit  = async()=>{
      if(!groupchatName || !selectedUsers){
        alert("Enter group name!");
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const {data} = await axios.post("/api/chat/group", {
          name : groupchatName,
          users : JSON.stringify(selectedUsers.map((u)=>(u._id)))
        }, config);

        setChats([data, ...chats]);
        handleClose();
      } catch (error) {
        alert("Error occured!")
      }
  }

  const deleteBadge = (user)=>{
    setSelectedUsers(selectedUsers.filter((sel)=> sel._id !== user._id));
  }

  const handleGroup = (userToAdd)=>{
      if(selectedUsers.includes(userToAdd)){
        alert("User already there in group!");
        return;
      }
      setSelectedUsers([...selectedUsers, userToAdd])

  }

  return (
    <div>
      <Button
        sx={{
          '&:hover': {
        backgroundColor: '#cdf2fa'
        },
        backgroundColor : "#E8E8E8",
        color : "black"
        }}
        style={{textTransform : "none "}}
        onClick={handleOpen}
        >New group chat<BiPlus style={{color : "black", width : "20px", height : "20px"}}/>
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{
            display : "flex",
            justifyContent : "center",
            fontSize : "35px",
            fontFamily : "sans-serif",
            marginBottom : "10px"
          }}>
            Create Group
          </Typography>
          <Box style={{
            display : "flex",
            flexDirection : "column",
            alignItems : "center"
          }}>
            <FormControl style={{marginBottom : "15px", width : "100%"}}>
                <TextField 
                placeholder='Group name'
                onChange={(e)=>setGroupchatName(e.target.value)}
                />
            </FormControl>
            <FormControl style={{marginBottom : "15px", width : "100%"}}>
                <TextField 
                placeholder='Add users'
                onChange={(e)=>handleSearch(e.target.value)}
                />
            </FormControl>

            <span style={{
              marginBottom : "10px",
              width : "100%"
            }}>
              {selectedUsers.map((user)=>(
                <UserBadge key={user._id} user = {user} handleFunction={()=>deleteBadge(user)}/>
              ))}
            </span>

            <Box style={{
              width : "100%",
              display : "flex",
              flexDirection : "column"
            }}>
            {loading?(
              <CircularProgress color='#38B2AC'/>
            ):(
              searchResults?.slice(0,4).map((user)=>(
                <Box style={{
                  margin : "5px"
                }}>
                    <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                </Box>
              ))
            )}

            </Box>

            <Button onClick={handleSubmit} style={{
              left : "40%",
              display : "flex",
              marginTop : "15px",
              textTransform : "none",
              backgroundColor : "#38B2AC",
              color : "white"
            }}>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}