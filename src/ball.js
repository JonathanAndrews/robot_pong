var Ball = function(canvas) {
  this.RADIUS = 5
  this.position = { x: 450, y: 300}
  this.canvas = canvas
  this.context = this.canvas.getContext("2d");
}

Ball.prototype.draw = function(ctx = this.context) {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.RADIUS, 0, Math.PI*2);
  ctx.fillStyle = '#FFFFFF'
  ctx.fill();
  ctx.closePath();
}

module.exports = Ball;