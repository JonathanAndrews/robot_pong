var Game = function(paddle = new Paddle(document.getElementById('myCanvas'))) {
  this.paddle = paddle;
}

Game.prototype.run = function () {
  this.paddle.draw()
}

module.exports = Game
