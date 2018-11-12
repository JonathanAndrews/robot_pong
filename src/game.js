var Game = function(paddle, ball) {
  this.paddle = paddle;
  this.ball = ball;
}

Game.prototype.run = function () {
  this.paddle.draw()
  this.ball.draw()
}

module.exports = Game;
