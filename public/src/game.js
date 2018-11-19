const Game = function Game( playerPaddle, aiPaddle, ball, canvasDisplay, aiInterface, totalIntervals = 300) {
  this.playerPaddle = playerPaddle;
  this.aiPaddle = aiPaddle;
  this.ball = ball;
  this.canvasDisplay = canvasDisplay;
  this.upButton = false;
  this.downButton = false;
  this.score = [0, 0];
  this.totalIntervals = totalIntervals;
  this.intervalRemaining = totalIntervals;
  this.gameOver = true;
  this.gravity = false;
  this.aiInterface = aiInterface;
  that = this;
};

Game.prototype.checkPaddleCollision = function checkPaddleCollision() {
  if (this._isPlayerPaddleCollision()) {
    this.ball.paddleCollision(this.playerPaddle.yPosition, this.playerPaddle.DIMENSIONS.height);
  } else if (this._isAiPaddleCollision()) {
    this.ball.paddleCollision(this.aiPaddle.yPosition, this.aiPaddle.DIMENSIONS.height);
  }
};

Game.prototype.run = function run() {
  if (that.intervalRemaining > 0) {
    ai_inputs = that.getAIInputs();
    move = that.aiInterface.getMove(ai_inputs);
    this.canvasDisplay.clear();
    this.canvasDisplay.drawLines();
    this.canvasDisplay.drawRobot();
    this.canvasDisplay.drawTime(that.intervalRemaining);
    this.canvasDisplay.drawScores(that.score[0],that.score[1]);
    that.playerPaddle.draw();
    that.aiPaddle.draw();
    this.ball.draw();
    this.ball.moveBall();
    this.ball.accelerationAct(that.gravity);
    that.playerPaddle.moveUp(that.upButton);
    that.playerPaddle.moveDown(that.downButton);
    that.aiPaddle.movePaddle(move);
    that.checkPaddleCollision();
    that.checkForGoal();
    that.intervalRemaining -= 1;
  } else if (that.intervalRemaining === 0){
    that.isGameOver();
    this.canvasDisplay.clear();
    this.canvasDisplay.drawGameOverPage(that.score);
  }
};

Game.prototype.getAIInputs = function getAIInputs() {
  return {
     'user-paddle-y': this.playerPaddle.yPosition,
     'user-paddle-dy': this.playerPaddle.SPEED,
     'comp-paddle-y': this.aiPaddle.yPosition,
     'comp-paddle-dy': this.aiPaddle.SPEED,
     'ball-position-x': this.ball.position.x,
     'ball-position-y': this.ball.position.y,
     'ball-velocity-dx': this.ball.velocity.dx,
     'ball-velocity-dy': this.ball.velocity.dy,
     'time-remaining': this.intervalRemaining,
     'score': (this.score[0] - this.score[1]),
          }
};

Game.prototype.setDifficulty = function (level) {
  // this.aiInterface.getDifficulty(level);
};

Game.prototype.addGravity = function addGravity() {
  that.gravity = true;
};

Game.prototype.removeGravity = function removeGravity() {
  that.gravity = false;
};

Game.prototype.keyDownHandler = function keyDownHandler(e) {
  if (e.keyCode === 38) {
    that.upButton = true;
  } else if (e.keyCode === 40) {
    that.downButton = true;
  }
};

Game.prototype.keyUpHandler = function keyUpHandler(e) {
  if (e.keyCode === 38) {
    that.upButton = false;
  } else if (e.keyCode === 40) {
    that.downButton = false;
  }
};

Game.prototype.checkForGoal = function checkForGoal() {
  if (this.ball.position.x < -this.ball.RADIUS) {
    this.score[1] += 1;
    this.ball.reset();
  } else if (this.ball.position.x > this.canvasDisplay.width + this.ball.RADIUS) {
    this.score[0] += 1;
    this.ball.reset();
  }
};

Game.prototype.isGameOver = function isGameOver() {
  if (this.intervalRemaining <= 0) {
    this.gameOver = true;
  }
};


// Player Paddle Collision Methods

Game.prototype._isPlayerPaddleCollision = function _isPlayerPaddleCollision() {
  return (this._isBallWithinRangeOfPlayer() && (this._isPlayerInPosition()) && (this.ball.velocity.dx <= 0));
};

Game.prototype._isBallWithinRangeOfPlayer = function _isBallWithinRangeOfPlayer() {
  return (this.ball.position.x >= this.playerPaddle.xPosition
          && this.ball.position.x <= this.playerPaddle.DIMENSIONS.width + this.playerPaddle.xPosition);
};

Game.prototype._isPlayerInPosition = function _isPlayerInPosition() {
  return (this._isBallWithinLowerBoundOfPlayerPaddle()
          && this._isBallWithinUpperBoundOfPlayerPaddle());
};

Game.prototype._isBallWithinLowerBoundOfPlayerPaddle = function _isBallWithinLowerBoundOfPlayerPaddle() {
  return (this.playerPaddle.yPosition + this.playerPaddle.DIMENSIONS.height
          >= this.ball.position.y);
};

Game.prototype._isBallWithinUpperBoundOfPlayerPaddle = function _isBallWithinUpperBoundOfPlayerPaddle() {
  return (this.playerPaddle.yPosition <= this.ball.position.y);
};

// Ai Paddle Collision Methods

Game.prototype._isAiPaddleCollision = function _isAiPaddleCollision() {
  return (this._isBallWithinRangeOfAi() && (this._isAiInPosition()) && (this.ball.velocity.dx >= 0));
};

Game.prototype._isBallWithinRangeOfAi = function _isBallWithinRangeOfAi() {
  return (this.ball.position.x + this.ball.RADIUS >= this.aiPaddle.xPosition
          && this.ball.position.x + this.ball.RADIUS <= this.aiPaddle.xPosition + this.aiPaddle.DIMENSIONS.width);
};

Game.prototype._isAiInPosition = function _isAiInPosition() {
  return (this._isBallWithinLowerBoundOfAiPaddle() && this._isBallWithinUpperBoundOfAiPaddle());
};

Game.prototype._isBallWithinLowerBoundOfAiPaddle = function _isBallWithinLowerBoundOfAiPaddle() {
  return (this.aiPaddle.yPosition + this.aiPaddle.DIMENSIONS.height >= this.ball.position.y);
};

Game.prototype._isBallWithinUpperBoundOfAiPaddle = function _isBallWithinUpperBoundOfAiPaddle() {
  return (this.aiPaddle.yPosition <= this.ball.position.y);
};


if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Game;
}
