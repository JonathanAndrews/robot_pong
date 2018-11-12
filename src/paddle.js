var Paddle = function(canvas) {
  this.DIMENSIONS = { height: 80, width: 10 }
  this.canvas = canvas
  this.context = this.canvas.getContext("2d");
}

Paddle.prototype.draw = function(ctx = this.context) {
  ctx.beginPath();
  ctx.rect(10,260,this.DIMENSIONS.width,this.DIMENSIONS.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.closePath();
}

module.exports = Paddle;