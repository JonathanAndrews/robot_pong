var Canvas = function(canvas) {
  this.canvas = canvas
  this.context = this.canvas.getContext("2d");
}

Canvas.prototype.clear = function () {
  this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
};

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = Canvas;
}
