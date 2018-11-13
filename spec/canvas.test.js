const Canvas = require('../src/canvas')

describe('Canvas', function() {

  let stubContext;
  let stubCanvas;

  beforeEach(() => {
    stubContext = {
      clearRect: jest.fn()
    };
    stubCanvas = {
      getContext: jest.fn(() => stubContext)
    };
  })

  it('clears the canvas', () => {
    const canvas = new Canvas(stubCanvas);
    canvas.clear()
    expect(stubContext.clearRect).toHaveBeenCalledTimes(1);
  })
})
