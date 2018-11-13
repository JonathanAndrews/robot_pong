var Ball = function(canvas) {
  this.RADIUS = 5
  this.position = { x: 450, y: 300}
  this.canvas = canvas
  this.context = this.canvas.getContext("2d");
  this.velocity = { dx: 5, dy: 5}
}

Ball.prototype.draw = function(ctx = this.context) {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.RADIUS, 0, Math.PI*2);
  ctx.fillStyle = '#FFFFFF'
  ctx.fill();
  ctx.closePath();
}

Ball.prototype.moveBall = function() {
  this.position.x += this.velocity.dx
  this.position.y += this.velocity.dy
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = Ball;
}
