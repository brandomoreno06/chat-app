import React, { useState } from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import UpdateProfile from "./UpdateProfile";
import MenuIcon from '@material-ui/icons/Menu';


const ProfileMenu = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = (e) => {
    handleClose()
    e.preventDefault();
    firebase.auth().signOut()
    history.push("/")
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <UpdateProfile/>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      
    </div>
  );
}

export default ProfileMenu;