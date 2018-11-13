const Game = function Game(paddle, ball, canvas) {
  this.paddle = paddle;
  this.ball = ball;
  this.canvas = canvas;
};

Game.prototype.checkPaddleCollision = function() {
  if ((this.ball.position.x === 10) && ((this.paddle.position.y + this.paddle.DIMENSIONS.height >= this.ball.position.y) && (this.paddle.position.y <= this.ball.position.y))) {
    this.ball.paddleCollision()
  }
};

Game.prototype.run = function() {
  this.checkPaddleCollision();
  this.canvas.clear();
  this.paddle.draw();
  this.ball.draw();
  this.ball.moveBall();
};


if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Game;
}
