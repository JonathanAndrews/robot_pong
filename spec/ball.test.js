const Ball = require('../src/ball')

describe('Ball', function() {

  let stubContext;
  let stubCanvas;

  beforeEach(() => {
    stubContext = {
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn()
    };
    stubCanvas = {
      getContext: jest.fn(() => stubContext)
    };
  })

  it('calls beginPath on ctx', () => {
    const ball = new Ball(stubCanvas);
    ball.draw()
    expect(stubContext.beginPath).toHaveBeenCalledTimes(1);
    expect(stubContext.arc).toHaveBeenCalledTimes(1);
    expect(stubContext.fill).toHaveBeenCalledTimes(1);
    expect(stubContext.closePath).toHaveBeenCalledTimes(1);
    expect(stubContext.fillStyle).toEqual('#FFFFFF')
  })
})