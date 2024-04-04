import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function SideBar({ isOpen, toggleSidebar }) {
  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleSidebar(false)}
      onKeyDown={() => toggleSidebar(false)}

      
    >
      <List>
        {['User Management', 'Device Management', 'Weather Data', 'Charts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => toggleSidebar(false)}
      >
        {list}
      </Drawer>
    </div>
  );
}