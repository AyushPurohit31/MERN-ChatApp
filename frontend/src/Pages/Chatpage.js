import { Box } from '@mui/system'
import React, { useState } from 'react'
import ChatBox from '../components/miscellaneous/ChatBox'
import MyChats from '../components/miscellaneous/MyChats'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import { ChatState } from '../Context/chatProvider'

const Chatpage = () => {
  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{width : "100%"}}>
      {user && <SideDrawer />}
      <Box
       style = {{
        display:'flex',
       justifyContent : 'space-between',
       height : "91vh",
       width :"100%",
       padding : "10px",
       }}
      >
        {user && <MyChats fetchAgain = {fetchAgain}/>}
        {user && <ChatBox fetchAgain = {fetchAgain} setFetchAgain = {setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default Chatpage
