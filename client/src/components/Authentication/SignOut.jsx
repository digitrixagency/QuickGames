import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { clearLocalCache } from '../../cache/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '../../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../middleware/auth';

export default function BasicPopover() {

  const userstates = useSelector(userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const logoutHandler = async () =>{
    await signOut(dispatch,navigate);
  }

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <AccountCircle fontSize='medium'   onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <Button variant="contained"
        onClick={logoutHandler}
      >Log Out</Button>
      </Popover>
    </div>
  );
}