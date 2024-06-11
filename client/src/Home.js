import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';

const Home = () => {
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
            <Paper 
                elevation={3} 
                sx={{
                    p: 4, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 400,
                    textAlign: 'center',
                }}
            >
                <Typography 
                    variant="h2" 
                    component="h1" 
                    gutterBottom 
                    sx={{
                        fontSize: { xs: '2rem', md: '3rem' },
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        textAlign: 'center',
                    }}
                >
                    Welcome to 7 Up 7 Down Game
                </Typography>
                <Typography 
                    variant="subtitle1" 
                    gutterBottom 
                    sx={{
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        color: 'text.secondary',
                        mb: 2,
                        textAlign: 'center',
                    }}
                >
                    Test your luck and skill with this fun and exciting game!
                </Typography>
                <Button 
                    component={Link} 
                    to="/game" 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    sx={{
                        mt: 2,
                        width: { xs: '100%', sm: 'auto' },
                        fontSize: { xs: '1rem', md: '1.25rem' },
                    }}
                >
                    Start Game
                </Button>
            </Paper>
        </Container>
    );
};

export default Home;
