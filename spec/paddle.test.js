const Paddle = require('../src/paddle')

describe('Paddle', function() {

  let stubContext;
  let stubCanvas;

  beforeEach(() => {
    stubContext = {
      beginPath: jest.fn(),
      rect: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn()
    };
    stubCanvas = {
      getContext: jest.fn(() => stubContext)
    };
  })

  it('calls beginPath on ctx', () => {
    const paddle = new Paddle(stubCanvas);
    paddle.draw()
    expect(stubContext.beginPath).toHaveBeenCalledTimes(1);
    expect(stubContext.rect).toHaveBeenCalledTimes(1);
    expect(stubContext.fill).toHaveBeenCalledTimes(1);
    expect(stubContext.closePath).toHaveBeenCalledTimes(1);
    expect(stubContext.fillStyle).toEqual('#FFFFFF')
  })
})
