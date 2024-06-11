const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  betAmount: {
    type: Number,
    required: true,
    min: 0, 
  },
  betOption: {
    type: String,
    required: true,
    enum: ['7 down', '7', '7 up'],
  },
  dice1: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  dice2: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  result: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v === this.dice1 + this.dice2;
      },
      message: (props) => `Result should be the sum of dice1 and dice2`,
    },
  },
  win: {
    type: Boolean,
    required: true,
  },
  pointsChange: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});


GameSchema.virtual('calculatedResult').get(function () {
  return this.dice1 + this.dice2;
});


GameSchema.pre('validate', function (next) {
  this.result = this.dice1 + this.dice2;

  
  this.win = false;
  if (this.betOption === '7 up' && this.result > 7) {
    this.win = true;
  } else if (this.betOption === '7 down' && this.result < 7) {
    this.win = true;
  } else if (this.betOption === '7' && this.result === 7) {
    this.win = true;
  }

  
  if (this.win) {
    if (this.betOption === '7') {
      this.pointsChange = this.betAmount * 5;
    } else {
      this.pointsChange = this.betAmount * 2;
    }
  } else {
    this.pointsChange = -this.betAmount;
  }

  next();
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
