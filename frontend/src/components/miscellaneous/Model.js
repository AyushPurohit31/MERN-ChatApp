import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton } from '@mui/material';
import { AiFillEye } from 'react-icons/ai';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: "#E8E8E8",
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({user, children}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{textAlign : "center"}}>
      {children ? (
        <span style = {{color : "black", textTransform : "none", fontSize : "1rem"}} onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton onClick={handleOpen}><AiFillEye/></IconButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box 
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar sx={{ width: 210, height: 210 }} src = {user.pic}/>
          </Box>
          <Typography id="modal-modal-description" style= {{
          fontFamily : "Work Sans",
          fontSize : "40px",
          display : "flex",
          justifyContent : "center"
        }}>
            {user.name}
          </Typography>
          <Typography id="modal-modal-description" style= {{
          fontFamily : "Work Sans",
          fontSize : "25px",
          display : "flex",
          justifyContent : "center",
          opacity : "66%"
        }}>
            {user.email}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
