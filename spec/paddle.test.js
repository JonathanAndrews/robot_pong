const Paddle = require('../src/paddle');

describe('Paddle', () => {
  let stubContext;
  let stubCanvas;

  beforeEach(() => {
    stubContext = {
      beginPath: jest.fn(),
      rect: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
    };
    stubCanvas = {
      getContext: jest.fn(() => stubContext),
    };
  });

  it('calls beginPath on ctx', () => {
    const paddle = new Paddle(stubCanvas);
    paddle.draw();
    expect(stubContext.beginPath).toHaveBeenCalledTimes(1);
    expect(stubContext.rect).toHaveBeenCalledTimes(1);
    expect(stubContext.fill).toHaveBeenCalledTimes(1);
    expect(stubContext.closePath).toHaveBeenCalledTimes(1);
    expect(stubContext.fillStyle).toEqual('#FFFFFF');
  });

  it('for Player has x-position of 10', () => {
    const paddle1 = new Paddle(stubCanvas, 0);
    paddle1.draw();
    expect(paddle1.xPosition).toEqual(10);
  });

  it('for Player has x-position of 880 ', () => {
    const paddle2 = new Paddle(stubCanvas, 1);
    paddle2.draw();
    expect(paddle2.xPosition).toEqual(880);
  });
});
