import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from './authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await dispatch(register({ username, email, password })).unwrap();
            toast.success('Registration successful');
            navigate('/login');
        } catch (err) {
            toast.error(err || 'Registration failed');
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <Container 
            component="main" 
            maxWidth="xs" 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
            }}
        >
            <ToastContainer />
            <Paper 
                elevation={3} 
                sx={{
                    p: 4, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    sx={{
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        textAlign: 'center'
                    }}
                >
                    Register
                </Typography>
                <Box my={4} sx={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRegister}
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2, py: 1.5, fontSize: '1.1rem' }}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                    {error && (
                        <Typography
                            variant="body1"
                            color="error"
                            sx={{ mt: 2, textAlign: 'center' }}
                        >
                            {error}
                        </Typography>
                    )}
                    <Typography 
                        variant="body2" 
                        sx={{ mt: 2, textAlign: 'center' }}
                    >
                        Already have an account? <Link to="/login">Login here</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
