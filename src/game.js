const Game = function Game(playerPaddle, aiPaddle, ball, canvasDisplay) {
  this.playerPaddle = playerPaddle;
  this.aiPaddle = aiPaddle;
  this.ball = ball;
  this.canvasDisplay = canvasDisplay;
  this.upButton = false;
  this.downButton = false;
  this.score = [0, 0];
  that = this;
};

Game.prototype.checkPaddleCollision = function checkPaddleCollision() {
  if (this._isPlayerPaddleCollision() || this._isAiPaddleCollision()) {
    this.ball.paddleCollision();
  }
};

Game.prototype.run = function run() {
  this.canvasDisplay.clear();
  that.playerPaddle.draw();
  that.aiPaddle.draw();
  this.ball.draw();
  this.ball.moveBall();
  that.playerPaddle.moveUp(that.upButton);
  that.playerPaddle.moveDown(that.downButton);
  that.checkPaddleCollision();
  that.checkForGoal();
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
    this.score[0] +=1;
    this.ball.reset();
  }
};


// Player Paddle Collision Methods

Game.prototype._isPlayerPaddleCollision = function _isPlayerPaddleCollision() {
  return (this._isBallWithinRangeOfPlayer() && (this._isPlayerInPosition()));
};

Game.prototype._isBallWithinRangeOfPlayer = function _isBallWithinRangeOfPlayer() {
  return (this.ball.position.x
          === this.playerPaddle.DIMENSIONS.width + this.playerPaddle.xPosition);
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
  return (this._isBallWithinRangeOfAi() && (this._isAiInPosition()));
};

Game.prototype._isBallWithinRangeOfAi = function _isBallWithinRangeOfAi() {
  return (this.ball.position.x === this.aiPaddle.xPosition);
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
