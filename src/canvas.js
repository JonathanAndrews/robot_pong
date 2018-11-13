const Canvas = function Canvas(canvas) {
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
};

Canvas.prototype.clear = function clear() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
  module.exports = Canvas;
}
