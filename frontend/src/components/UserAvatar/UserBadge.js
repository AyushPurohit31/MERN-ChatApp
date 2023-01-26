import styled from '@emotion/styled'
import { Chip } from '@mui/material'
import React from 'react'

const CustomChip = styled(Chip)({
    margin : "3px",
})
const UserBadge = ({user, handleFunction}) => {
  return ( 
        <CustomChip label={user.name} onDelete={handleFunction} color = "secondary"/>
 )
}

export default UserBadge
