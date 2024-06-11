import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('https://vineetpersonal.site:5000/api/auth/register', { username, email, password });
            toast.success('Registration successful');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed');
        }
    };

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
                        sx={{ mt: 2, py: 1.5, fontSize: '1.1rem' }}
                    >
                        Register
                    </Button>
                    <Typography 
                        variant="body2" 
                        sx={{ mt: 2, textAlign: 'center' }}
                    >
                        Already have an account? <Link href="/login">Login here</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
