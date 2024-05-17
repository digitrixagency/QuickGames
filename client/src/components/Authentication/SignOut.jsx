import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Add your sign-out logic here
    console.log('Sign out');
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <IconButton 
        sx={{ marginLeft: '9px' }} 
        color="inherit" 
        aria-label="account"
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize='medium' />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default AccountMenu;