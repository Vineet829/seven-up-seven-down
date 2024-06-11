const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gameController = require('../controllers/gameController'); 
const gameAuth = require('../middleware/gameAuth'); 


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/roll',
  gameAuth,
  [
    check('betAmount', 'Bet amount must be a positive number').isInt({ gt: 0 }),
    check('betOption', 'Invalid bet option').isIn(['7 up', '7 down', '7']),
  ],
  handleValidationErrors,
  gameController.roll
);

router.get(
  '/points',
  gameAuth,
  gameController.getPoints
);


router.put(
  '/points',
  gameAuth,
  [
    check('points', 'Points must be a non-negative number').isInt({ min: 0 })
  ],
  handleValidationErrors,
  gameController.setPoints
);

module.exports = router;
