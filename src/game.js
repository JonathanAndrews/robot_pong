function Game() {
  this.paddle = new Paddle(document.getElementById('myCanvas'));
}

Game.prototype.run = function () {

  this.paddle.draw()


}