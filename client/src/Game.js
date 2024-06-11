import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setBetAmount, setBetOption, rollDice, fetchPointsById, updatePoints } from './gameSlice';
import Confetti from 'react-confetti';
import './Game.css';
import image1 from "./images/dice-01.svg";
import image2 from "./images/dice-02.svg";
import image3 from "./images/dice-03.svg";
import image4 from "./images/dice-04.svg";
import image5 from "./images/dice-05.svg";
import image6 from "./images/dice-06.svg";

const images = [image1, image2, image3, image4, image5, image6];

const Game = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.user?.id);
  const points = useSelector(state => state.game.points);
  const diceResult = useSelector(state => state.game.diceResult);
  const message = useSelector(state => state.game.message);
  const betAmount = useSelector(state => state.game.betAmount);
  const betOption = useSelector(state => state.game.betOption);
  const loading = useSelector(state => state.game.loading);
  const error = useSelector(state => state.game.error);
  const [win, setWin] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const roll = () => {
    if (!betOption || !betAmount) {
      alert("Please select a bet type and amount.");
      return;
    }
    if (!token) {
      alert("You need to be logged in to place a bet.");
      return;
    }
    dispatch(rollDice({ betAmount, betOption, userId, token }));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (message && message.includes("Congratulations")) {
      setWin(true);
      setTimeout(() => setWin(false), 3000);
    }
  }, [message]);

  
  useEffect(() => {
    if (token && userId) {
      dispatch(fetchPointsById({ userId, token }));
    }
  }, [token, userId, dispatch]);

  
  useEffect(() => {
    if (points === null && token && userId) {
      dispatch(updatePoints({ userId, points: 5000, token }));
    }
  }, [points, token, userId, dispatch]);

  return (
    <div style={{ position: 'relative' }}>
      {win && <Confetti width={windowSize.width} height={windowSize.height} />}
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 15px 25px rgba(50, 50, 50, 0.15)',
          textAlign: 'center',
          position: 'relative',
          mt: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'secondary.main',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          7 Up 7 Down Game
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Points: {points}
        </Typography>
        <Box className={`dice-wrapper ${loading ? 'rolling' : ''}`} my={4}>
          <img
            id="die-1"
            src={diceResult ? images[diceResult.dice1 - 1] : images[0]}
            alt="Die 1"
            style={{ maxWidth: '100px', width: '100%' }}
          />
          <img
            id="die-2"
            src={diceResult ? images[diceResult.dice2 - 1] : images[0]}
            alt="Die 2"
            style={{ maxWidth: '100px', width: '100%' }}
          />
        </Box>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Place your bet:
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          <Button
            variant="contained"
            color={betOption === '7 down' ? 'secondary' : 'primary'}
            onClick={() => dispatch(setBetOption('7 down'))}
            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            7 DOWN
          </Button>
          <Button
            variant="contained"
            color={betOption === '7' ? 'secondary' : 'primary'}
            onClick={() => dispatch(setBetOption('7'))}
            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            Equals 7
          </Button>
          <Button
            variant="contained"
            color={betOption === '7 up' ? 'secondary' : 'primary'}
            onClick={() => dispatch(setBetOption('7 up'))}
            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            7 UP
          </Button>
        </Box>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Bet Amount</InputLabel>
          <Select
            value={betAmount}
            onChange={(e) => dispatch(setBetAmount(e.target.value))}
            label="Bet Amount"
            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={roll}
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            ROLL THE DICE
          </Button>
        </Box>
        {diceResult && (
          <Box mt={2}>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Your roll is {diceResult.result}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              {message}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Your points change: {diceResult.pointsChange}
            </Typography>
          </Box>
        )}
        {error && (
          <Box mt={2}>
            <Typography
              variant="body1"
              color="error"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              {error}
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Game;
