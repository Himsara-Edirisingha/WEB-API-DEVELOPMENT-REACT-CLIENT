import { Box } from '@mui/material';
import React from 'react';
import AppBar from '../common/TopBar/top-bar';
import SideBar from '../common/SideBar/side-bar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleSidebar = (isOpen) => {
        setIsSideBarOpen(isOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                anchorEl={anchorEl}
                handleMenu={handleMenu}
                handleClose={handleClose}
                logOut={logOut}
                toggleSidebar={toggleSidebar}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            </Box>
            <SideBar
                isOpen={isSideBarOpen}
                toggleSidebar={toggleSidebar}
                sx={{
                    position: 'fixed',
                    zIndex: 1000, 
                    top: '64px', 
                }}
            />
        </Box>
    );
};

export default Dashboard;