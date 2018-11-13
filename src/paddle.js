const Paddle = function Paddle(canvas) {
  this.DIMENSIONS = { height: 80, width: 10 };
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
};

Paddle.prototype.draw = function draw(ctx = this.context) {
  ctx.beginPath();
  ctx.rect(10, 260, this.DIMENSIONS.width, this.DIMENSIONS.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.closePath();
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Paddle;
}
