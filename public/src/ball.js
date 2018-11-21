const Ball = function Ball(canvas) {
  this.RADIUS = 5;
  this.position = { x: 450, y: 300 };
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  this.initialVelocity = { dx: 8, dy: 8 };
  this.velocity = { dx: 8, dy: 8 };
  this.acceleration = { ddx: 0, ddy: 0.2 };
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
  const whereOnPaddle = (this.position.y - paddleLocationY) / paddleHeight;
  this.velocity.dy = -6 * 4 * (0.5 - whereOnPaddle);
};

Ball.prototype.reset = function reset() {
  this.position = { x: 450, y: 300 };
  this.velocity = this.initialVelocity;
};

Ball.prototype.accelerationAct = function accelerationAct(gravity) {
  if (gravity) {
    this.velocity.dy += this.acceleration.ddy;
  }
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Ball;
}
