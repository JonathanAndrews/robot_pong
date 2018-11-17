const CanvasDisplay = function CanvasDisplay(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = this.canvas.getContext('2d');
};

CanvasDisplay.prototype.clear = function clear() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.drawLines = function drawLines() {
  for (var i = 0; i < 25; i++) {
    this.context.beginPath();
    this.context.rect(447, i*45, 6, 45/2);
    this.context.fillStyle = '#FFFFFF';
    this.context.fill();
    this.context.closePath();
  }
};

CanvasDisplay.prototype.drawScores = function (playerScore, aiScore) {
  this.context.font = '20px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.strokeText('ROBOT FACE PONG', 450, 40);
  this.context.fillText(playerScore + " - " + aiScore, 50, 30);
};

CanvasDisplay.prototype.drawTime = function (interval) {
  interval = Math.round(interval/50);
  this.context.font = '20px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.strokeText(interval, 800, 30);
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = CanvasDisplay;
}
