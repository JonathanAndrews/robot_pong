const CanvasDisplay = function CanvasDisplay(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = this.canvas.getContext('2d');
};

CanvasDisplay.prototype.clear = function clear() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = CanvasDisplay;
}
