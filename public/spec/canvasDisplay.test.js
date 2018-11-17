const CanvasDisplay = require('../src/canvasDisplay');

describe('Canvas Display', () => {
  let stubContext;
  let stubCanvas;

  beforeEach(() => {
    stubContext = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      closePath: jest.fn(),
      fill: jest.fn(),
      rect: jest.fn(),
    };
    stubCanvas = {
      getContext: jest.fn(() => stubContext),
    };
  });

  it('clears the canvas', () => {
    const canvasDisplay = new CanvasDisplay(stubCanvas);
    canvasDisplay.clear();
    expect(stubContext.clearRect).toHaveBeenCalledTimes(1);
  });

  describe('drawLines', () => {
    it('draws lines down the center of the cavas', () => {
      const canvasDisplay = new CanvasDisplay(stubCanvas);
      canvasDisplay.drawLines();
      expect(stubContext.beginPath).toHaveBeenCalledTimes(25);
      expect(stubContext.closePath).toHaveBeenCalledTimes(25);
      expect(stubContext.fill).toHaveBeenCalledTimes(25);
      expect(stubContext.rect).toHaveBeenCalledTimes(25);
      expect(stubContext.fillStyle).toEqual('#FFFFFF');
    })
  })
});
