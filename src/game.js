const Game = function Game(playerPaddle, aiPaddle, ball, canvas) {
  this.playerPaddle = playerPaddle;
  this.aiPaddle = aiPaddle;
  this.ball = ball;
  this.canvas = canvas;
  that = this;
};

Game.prototype.checkPaddleCollision = function checkPaddleCollision() {
  if ((this.ball.position.x === this.playerPaddle.DIMENSIONS.width + this.playerPaddle.xPosition) && ((this.playerPaddle.yPosition + this.playerPaddle.DIMENSIONS.height >= this.ball.position.y) && (this.playerPaddle.yPosition <= this.ball.position.y))
    || (this.ball.position.x === this.aiPaddle.xPosition) && ((this.aiPaddle.yPosition + this.aiPaddle.DIMENSIONS.height >= this.ball.position.y) && (this.aiPaddle.yPosition <= this.ball.position.y))) {
    this.ball.paddleCollision();
  }
};

Game.prototype.run = function run() {
  this.canvas.clear();
  this.playerPaddle.draw();
  this.aiPaddle.draw();
  this.ball.draw();
  this.ball.moveBall();
  that.checkPaddleCollision();
};


if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Game;
}
