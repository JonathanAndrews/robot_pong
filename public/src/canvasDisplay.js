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
  this.context.fillText(interval, 800, 30);
};

CanvasDisplay.prototype.drawRobot = function () {
  // robot's head
  this.context.beginPath();
  this.context.rect(140, 200, 180, 180)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  // robot's left eye
  this.context.beginPath();
  this.context.arc(200, 250, 18, 0, Math.PI*2, true)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.arc(200, 250, 6, 0, Math.PI*2, true)
  this.context.fillStyle = "rgba(255,255,255)";
  this.context.fill();

  // robot's right eye
  this.context.beginPath();
  this.context.arc(260, 250, 18, 0, Math.PI*2, true)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.arc(260, 250, 6, 0, Math.PI*2, true)
  this.context.fillStyle = "rgba(255,255,255)";
  this.context.fill();

  // antenna
  this.context.beginPath();
  this.context.rect(225, 160, 10, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.arc(230, 140, 20, 0, Math.PI*2, true)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.stroke();

  // mouth
  this.context.beginPath();
  this.context.rect(170, 300, 120, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(170, 300, 120, 20);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(170, 300, 60, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(170, 300, 30, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(230, 300, 30, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = CanvasDisplay;
}
