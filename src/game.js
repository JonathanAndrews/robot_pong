const Game = function Game(playerPaddle, aiPaddle, ball, canvas) {
  this.playerPaddle = playerPaddle;
  this.aiPaddle = aiPaddle;
  this.ball = ball;
  this.canvas = canvas;
  that = this;
};

Game.prototype.checkPaddleCollision = function checkPaddleCollision() {
  if (this._isPlayerPaddleCollision() || this._isAiPaddleCollision()) {
    this.ball.paddleCollision();
  }
};

Game.prototype.run = function run() {
  this.canvas.clear();
  that.playerPaddle.draw();
  that.aiPaddle.draw();
  this.ball.draw();
  this.ball.moveBall();
  that.checkPaddleCollision();
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
