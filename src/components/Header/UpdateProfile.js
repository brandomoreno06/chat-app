import './UpdateProfile.css'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase from "firebase";


function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    color: 'white',
    backgroundColor: '#4267B2',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const [input, setInput] = useState({ firstName: "", lastName: "" });

  const { firstName, lastName } = input;
  const inputHandler = (e) => {
    const name = e.target.name;
    setInput({...input, [name]: e.target.value})
  }

  const update = (e) => {
    e.preventDefault();
    setDisabled(true);

    firebase.auth().currentUser.updateProfile({
      displayName: `${firstName} ${lastName}`,
  })
    .then(() => {
      setDisabled(false)
      handleClose()
    })
    .catch((error) => {
      setDisabled(false)
      alert(error)
    })
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Update you profile</h2>
      <div id="simple-modal-description">
        <div className="profile__nameField__group" >
          <h5>First Name</h5>
          <input 
            className="profile__nameField"
            type="text"
            name="firstName"
            value={firstName}
            minLength="3"
            maxLength="30"
            onChange={inputHandler}
          />
        </div>
        <div className="profile__nameField__group" >
          <h5>Last Name</h5>
          <input
          className="profile__nameField"
          type="text"
          name="lastName"
          minLength="3"
          maxLength="30"
          value={lastName}
          onChange={inputHandler}
          />
        </div>
        <button 
          className="profile__nameField--submit"
          type="submit"
          disabled={disabled}
          onClick={update}
        >
          Update Profile
        </button>
      </div>
    </div>
  );


  return (
    <div>
      <div type="button" onClick={handleOpen}>
        Edit Profile
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
