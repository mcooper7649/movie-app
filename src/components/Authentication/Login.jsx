import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Box, Button, TextField } from '@material-ui/core';
import { auth } from '../../firebase';
import { UserState } from '../../UserContext';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAlert } = UserState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fill all the Fields',
        type: 'error',
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      console.log(result);

      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: 'success',
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: '#83b6ec' }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;