const Paddle = function Paddle(canvas, playerType) {
  this.DIMENSIONS = { height: 80, width: 10 };
  this.SPEED = 4
  this.yPosition = 420;
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  if (playerType === 0) {
    this.xPosition = 10;
  } else {
    this.xPosition = 880;
  }
};

Paddle.prototype.draw = function draw(ctx = this.context) {
  ctx.beginPath();
  ctx.rect(this.xPosition, this.yPosition, this.DIMENSIONS.width, this.DIMENSIONS.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.closePath();
};

Paddle.prototype.moveUp = function (truthy) {
  if (truthy) {
    this.yPosition -= this.SPEED;
  }
};

Paddle.prototype.moveDown = function (truthy) {
  if (truthy) {
    this.yPosition += this.SPEED;
  }
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Paddle;
}
