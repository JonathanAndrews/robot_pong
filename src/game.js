var Game = function(paddle, ball, canvas) {
  this.paddle = paddle;
  this.ball = ball;
  this.canvas = canvas;
}

Game.prototype.run = function () {
  this.canvas.clear()
  this.paddle.draw()
  this.ball.draw()
  this.ball.moveBall()
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = Game;
}
