import { Avatar, Box, Typography } from "@mui/material";
const UserListItem = ({ user, handleFunction}) => {

  return (
    <Box
      onClick={handleFunction}
      sx={{
        '&:hover': {
      backgroundColor: '#cdf2fa'
      },
      backgroundColor : "#E8E8E8",
      border : "1px solid gray"
    }}
      style={{
      cursor:"pointer",
      width:"350px",
      height : "60px",
      display:"flex",
      alignItems:"center",
      color:"black",
      borderRadius : "10px",
      }}
    >
      <Avatar
        cursor="pointer"
        name={user.name}
        src={user.pic}
        style={{margin : "0 4px 0 8px"}}
      />
      <Box >
        <Typography>{user.name}</Typography>
        <Typography fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;