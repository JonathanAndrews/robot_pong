const CanvasDisplay = require('../src/canvasDisplay');

describe('Canvas Display', () => {
  let stubContext;
  let stubCanvas;

  beforeEach(() => {
    stubContext = {
      clearRect: jest.fn(),
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
});
