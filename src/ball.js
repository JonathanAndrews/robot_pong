const Ball = function Ball(canvas) {
  this.RADIUS = 5;
  this.position = { x: 450, y: 300 };
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  this.velocity = { dx: 2.2, dy: 2 };
};

Ball.prototype.draw = function draw(ctx = this.context) {
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.closePath();
};

Ball.prototype.moveBall = function moveBall() {
  this.position.x += this.velocity.dx;
  this.position.y += this.velocity.dy;
  this.wallCollision();
};

Ball.prototype.wallCollision = function wallCollision() {
  if ((this.position.y - this.RADIUS) <= 0
        || (this.position.y + this.RADIUS) >= 600) {
    this.velocity.dy *= -1;
  }
};

Ball.prototype.paddleCollision = function paddleCollision(paddleLocationY, paddleHeight) {
  this.velocity.dx *= -1;
  const random = (this.position.y - paddleLocationY) / paddleHeight;
  this.velocity.dy = -4 * (0.5 - random);
};

Ball.prototype.reset = function reset() {
  this.position = { x: 450, y: 300 };
  this.velocity = { dx: 2, dy: 2 };
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Ball;
}
