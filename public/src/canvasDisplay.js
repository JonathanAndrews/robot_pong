const CanvasDisplay = function CanvasDisplay(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = this.canvas.getContext('2d');
};

CanvasDisplay.prototype.setUpStartPage = function setUpStartPage() {
  this.credits();

  this.context.font = '22px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.fillText('R O B O T    F A C E    P O N G', 450, 40);

  this.context.font = '22px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.fillText('How many times would you like the AI you play against to have trained?:', 450, 180);

  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {
      this.context.beginPath();
      this.context.rect(x*70+300, y*50+240, 40, 30);
      this.context.fillStyle = '#FFFFFF';
      this.context.fill();

      this.context.font = '15px Arial';
      this.context.fillStyle = 'black';
      this.context.textAlign = 'center';
      this.context.fillText(x*100 + y*500, x*70+320, y*50+260);
    }
  }
}

CanvasDisplay.prototype.drawGameOverPage = function drawGameOverPage(score) {
  this.context.font = '22px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.fillText('R O B O T    F A C E    P O N G', 450, 40);

  this.context.font = '40px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.fillText('G a m e  O v e r', 450, 250);

  this.context.beginPath();
  this.context.rect(350, 300, 200, 50);
  this.context.fillStyle = '#FFFFFF';
  this.context.fill();

  this.context.font = '30px Arial';
  this.context.fillStyle = '#123';
  this.context.textAlign = 'center';
  this.context.fillText('Play Again', 450, 335);

  this.context.font = '60px Arial';
  this.context.fillStyle = 'white';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.fillText(`${score[0]}    -    ${score[1]}`, 450, 500);

  document.getElementById('myCanvas').addEventListener('click', function(e) {
    if(game.gameOver && ((350 < e.offsetX && e.offsetX < 550) && (300 < e.offsetY && e.offsetY < 350))) {
      location.reload();
    }
  })

  this.credits();
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
  this.context.font = '22px Arial';
  this.context.fillStyle = 'white';
  this.context.textAlign = 'center';
  this.context.fillText('R O B O T    F A C E    P O N G', 450, 40);
  this.context.fillText(playerScore + " - " + aiScore, 50, 30);
};

CanvasDisplay.prototype.drawTime = function (interval) {
  interval = Math.round(interval/50);
  this.context.font = '20px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.fillText(interval+'s', 800, 30);
};

CanvasDisplay.prototype.credits = function() {
  this.context.font = '12px Arial';
  this.context.strokeStyle = 'white';
  this.context.textAlign = 'center';
  this.context.lineWidth = 0.5;
  this.context.fillStyle = 'white';
  this.context.fillText('Created by: James Rodney, Aidan Faria, Jonathan Andrews and Cameron Whitehead', 640, 580);
}

CanvasDisplay.prototype.drawRobot = function () {
  // robot's head
  this.context.beginPath();
  this.context.rect(140+450, 200, 180, 180)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  // robot's left eye
  this.context.beginPath();
  this.context.arc(200+450, 250, 18, 0, Math.PI*2, true)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.arc(200+450, 250, 6, 0, Math.PI*2, true)
  this.context.fillStyle = "rgba(255,255,255)";
  this.context.fill();

  // robot's right eye
  this.context.beginPath();
  this.context.arc(260+450, 250, 18, 0, Math.PI*2, true)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.arc(260+450, 250, 6, 0, Math.PI*2, true)
  this.context.fillStyle = "rgba(255,255,255)";
  this.context.fill();

  // antenna
  this.context.beginPath();
  this.context.rect(225+450, 160, 10, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.arc(230+450, 140, 20, 0, Math.PI*2, true)
  this.context.strokeStyle = "rgba(255,255,255)";
  this.context.stroke();

  // mouth
  this.context.beginPath();
  this.context.rect(170+450, 300, 120, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(170+450, 300, 120, 20);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(170+450, 300, 60, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(170+450, 300, 30, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

  this.context.beginPath();
  this.context.rect(230+450, 300, 30, 40);
  this.context.stokeStyle = "rgba(255,255,255)";
  this.context.lineWidth = 3;
  this.context.stroke();

};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = CanvasDisplay;
}
