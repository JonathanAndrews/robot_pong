const Paddle = function Paddle(canvas, playerType) {
  this.SPEED = 6;
  this.DIMENSIONS = { height: 100, width: 10 };
  this.yPosition = 420;
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  if (playerType === 0) {
    this.xPosition = 10;
  } else {
    this.DIMENSIONS = { height: 100, width: 10 };
    this.yPosition = 10;
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

Paddle.prototype.moveUp = function moveUp(truthy) {
  if (truthy) {
    this.movePaddle(-1);
  }
};

Paddle.prototype.moveDown = function moveDown(truthy) {
  if (truthy) {
    this.movePaddle(1);
  }
};

Paddle.prototype.movePaddle = function movePaddle(direction) {
  this.yPosition += direction * this.SPEED;
  this.checkBoundaries();
};

Paddle.prototype.checkBoundaries = function checkBoundaries() {
  if (this.yPosition <= 0) {
    this.yPosition = 0;
  } else if (this.yPosition + this.DIMENSIONS.height >= this.canvas.height) {
    this.yPosition = this.canvas.height - this.DIMENSIONS.height;
  }
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Paddle;
}
