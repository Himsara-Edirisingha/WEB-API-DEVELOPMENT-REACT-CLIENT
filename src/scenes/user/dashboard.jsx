import { Box, Button } from '@mui/material'
import React from 'react'

const Dashboard = () => {
    return (
        <Box>{localStorage.getItem('token')}
            <Button onClick={() => { localStorage.removeItem('token') }}>logout</Button>
        </Box>
    )
}

export default Dashboard