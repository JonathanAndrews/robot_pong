const Game = function Game(paddle, ball, canvas) {
  this.paddle = paddle;
  this.ball = ball;
  this.canvas = canvas;
};

Game.prototype.run = function run() {
  this.canvas.clear();
  this.paddle.draw();
  this.ball.draw();
  this.ball.moveBall();
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Game;
}
