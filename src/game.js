const Game = function Game(paddle, ball, canvas) {
  this.paddle = paddle;
  this.ball = ball;
  this.canvas = canvas;
};

Game.prototype.checkPaddleCollision = function () {
  console.log('hello');
  if ((this.ball.position.x === 10) && ((this.paddle.position.y + this.paddle.DIMENSIONS.height >= this.ball.position.y) && (this.paddle.position.y <= this.ball.position.y))) {
    this.ball.paddleCollision()
  }
};

Game.prototype.run = function() {
  this.canvas.clear();
  this.paddle.draw();
  this.ball.draw();
  this.ball.moveBall();
  this.ball.paddleCollision(this.paddle.yPosition, this.paddle.DIMENSIONS.height)
};


if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Game;
}
