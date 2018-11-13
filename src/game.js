var Game = function(paddle, ball) {
  this.paddle = paddle;
  this.ball = ball;
}

Game.prototype.run = function () {
  this.paddle.draw()
  this.ball.draw()
  this.ball.moveBall()
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = Game;
}
