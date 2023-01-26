
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { Input, OutlinedInput, Tooltip, Typography } from '@mui/material';
import { BiSearchAlt } from 'react-icons/bi';
import { useState } from 'react';
import axios from "axios";
import { ChatState } from '../../Context/chatProvider';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';


export default function SideBar() {
  const [search, setSearch] = useState("");
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = async()=> {
    if(!search){
      alert("please enter something in search bar!");
    }
    try {
      setLoading(true);
      const config = {
        headers : {
          Authorization : `Bearer ${user.token}`
        }
      }

      const {data} = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult)
    } catch (error) {
      alert(error.message)
    }
  }

  const accessChat = async (userId)=>{
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      alert("Error fetching the chat")
    }
  }

  const list = () => (
    <Box
    style= {{width : "382px"}}
      role="presentation"
    >
      <List >
        <ListItem style={{
              display : "flex",
              justifyContent : "center",
              textAlign : "center"
            }}>
          <Typography 
            variant='h5'
            >
              Search Users
          </Typography>
        </ListItem>
        <Divider/>
        <ListItem style={{
              display : "flex",
              justifyContent : "center",
              textAlign : "center"
            }}>
          <Box style={{margin : "10px 0 10px 0"}}>
            <OutlinedInput 
              placeholder='search by name or email'
              value={search}
              onChange = {(e)=>{setSearch(e.target.value)}}
              style = {{
                padding : "0px"
              }}
              endAdornment = {
                <Button  
                 sx={{
                   '&:hover': {
                   backgroundColor: '#cdf2fa'
                   },
                   color : "black"
                  }}

                  onClick={handleClick}
                >
                  <BiSearchAlt style = {{height : "46px"}}
                  />
                </Button>
              }
            />
          </Box>
        </ListItem>
            {loading?(<ChatLoading/>):(
              searchResult.map((user)=>(
                <ListItem onClick = {toggleDrawer("left", false)} style = {{padding: "0" ,margin : " 0 16px 15px 16px", width : "350px"}}>
                    <UserListItem
                      key={user._id}
                      user = {user}
                      handleFunction = {()=>accessChat(user._id)}
                    />
                </ListItem>
              ))
            )}
      </List>
    </Box>
  );

  return (
    <div>
          <Tooltip title="Search users to chat" arrow placement='bottom-end'>
                <Button onClick={toggleDrawer("left", true)} style={{ fontSize : "17px" ,color : "black", textTransform : "none"}} > 
                    <BiSearchAlt style={{padding : "0 15px 0 0", width : "20px", height : "20px"}}/>
                    <span style={{padding : "0 10px, 0, 10px" }}>Search user</span>
                </Button>
          </Tooltip>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list()}
          </Drawer>
    </div>
  );
}