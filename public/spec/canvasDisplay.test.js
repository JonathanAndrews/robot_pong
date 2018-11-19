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
      strokeText: jest.fn(),
      fillText: jest.fn(),
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
    });
  });

  describe('drawScores', () => {
    it('draws the current scores on canvas', () => {
      const canvasDisplay = new CanvasDisplay(stubCanvas);
      canvasDisplay.drawScores();
      expect(stubContext.strokeText).toHaveBeenCalledTimes(1);
      expect(stubContext.fillText).toHaveBeenCalledTimes(1);
      expect(stubContext.font).toEqual('20px Arial');
      expect(stubContext.strokeStyle).toEqual('white');
      expect(stubContext.textAlign).toEqual('center');
    });
  });

  describe('drawTime', () => {
    it('gives the amount of time remaining', () => {
      const canvasDisplay = new CanvasDisplay(stubCanvas);
      canvasDisplay.drawTime();
      expect(stubContext.fillText).toHaveBeenCalledTimes(1);
      expect(stubContext.font).toEqual('20px Arial');
      expect(stubContext.strokeStyle).toEqual('white');
      expect(stubContext.textAlign).toEqual('center');
    });
  });
});
