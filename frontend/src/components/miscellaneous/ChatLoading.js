import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';

export default function ChatLoading() {
  return (
    <Box>
      <Stack>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        <Skeleton variant="rectangular" width ={350} height={60} style={{borderRadius: "10px", margin : " 0 16px 15px 16px",}}/>
        
      </Stack>
    </Box>
  );
}