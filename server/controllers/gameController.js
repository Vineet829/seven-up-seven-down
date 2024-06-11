const User = require('../models/Users');
const Game = require('../models/Game');
const { check, validationResult } = require('express-validator');


const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};


exports.roll = async (req, res) => {
  await check('betAmount', 'Bet amount must be a positive number').isInt({ gt: 0 }).run(req);
  await check('betOption', 'Invalid bet option').isIn(['7 up', '7 down', '7']).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { betAmount, betOption } = req.body;
  const user = req.user; 
  
  try {
    
    if (user.points < betAmount) {
      return res.status(400).json({ msg: 'Not enough points' });
    }

    
    const dice1 = rollDice();
    const dice2 = rollDice();
    const result = dice1 + dice2;

    let winAmount = 0;
    let won = false;
    let message = '';

    if (
      (betOption === '7 up' && result > 7) ||
      (betOption === '7 down' && result < 7) ||
      (betOption === '7' && result === 7)
    ) {
      won = true;
      if (betOption === '7') {
        winAmount = betAmount * 5;
        message = 'Congratulations! You hit Lucky 7!';
      } else {
        winAmount = betAmount * 2;
        message = `Congratulations! You won the bet on ${betOption.toUpperCase()}!`;
      }
      user.points += winAmount;
    } else {
      message = 'Sorry, you lost the bet.';
    }

    const pointsChange = won ? winAmount : -betAmount;

    
    user.points -= betAmount;

    
    const game = new Game({
      userId: user._id,
      betAmount,
      betOption,
      dice1,
      dice2,
      result,
      win: won,
      pointsChange
    });
    await game.save();

    
    await user.save();

    res.json({
      dice1,
      dice2,
      result,
      win: won,
      pointsChange,
      message,
      newPoints: user.points 
    });
  } catch (err) {
    console.error('Error in roll function:', err.message);
    res.status(500).json({ msg: 'Server error: unable to process the bet' });
  }
};


exports.getPoints = async (req, res) => {
  try {
    const user = req.user; 
    res.json({ points: user.points });
  } catch (err) {
    console.error('Error in getPoints function:', err.message);
    res.status(500).json({ msg: 'Server error: unable to fetch points' });
  }
};


exports.setPoints = async (req, res) => {
  await check('points', 'Points must be a non-negative number').isInt({ min: 0 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { points: newPoints } = req.body;
  const user = req.user; 

  try {
    user.points = newPoints;
    await user.save();

    res.json({ points: user.points });
  } catch (err) {
    console.error('Error in setPoints function:', err.message);
    res.status(500).json({ msg: 'Server error: unable to set points' });
  }
};
