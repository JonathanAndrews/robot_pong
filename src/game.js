const Game = function Game(paddle, ball, canvas) {
  this.paddle = paddle;
  this.ball = ball;
  this.canvas = canvas;
  that = this;
};

Game.prototype.checkPaddleCollision = function () {
  paddleXPosition = 10
  if ((this.ball.position.x <= this.paddle.DIMENSIONS.width + paddleXPosition) && ((this.paddle.yPosition + this.paddle.DIMENSIONS.height >= this.ball.position.y) && (this.paddle.yPosition <= this.ball.position.y))) {
    this.ball.paddleCollision()
  }
};

Game.prototype.run = function() {
  this.canvas.clear();
  this.paddle.draw();
  this.ball.draw();
  this.ball.moveBall();
  that.checkPaddleCollision();
};


if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Game;
}
