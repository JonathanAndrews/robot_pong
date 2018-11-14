const Ball = require('../src/ball');

describe('Ball', () => {
  let stubContext;
  let stubCanvas;

  beforeEach(() => {
    stubContext = {
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
    };
    stubCanvas = {
      getContext: jest.fn(() => stubContext),
    };
  });

  it('calls beginPath on ctx', () => {
    const ball = new Ball(stubCanvas);
    ball.draw();
    expect(stubContext.beginPath).toHaveBeenCalledTimes(1);
    expect(stubContext.arc).toHaveBeenCalledTimes(1);
    expect(stubContext.fill).toHaveBeenCalledTimes(1);
    expect(stubContext.closePath).toHaveBeenCalledTimes(1);
    expect(stubContext.fillStyle).toEqual('#FFFFFF');
  });

  it('should change position', () => {
    const ball = new Ball(stubCanvas);
    ball.moveBall();
    expect(ball.position).toEqual({ x: 452, y: 302 });
  });

  describe('Wall collision', () => {
    it('should not reverse vertical velocity, if ball does not hit wall', () => {
      const ball = new Ball(stubCanvas);
      ball.moveBall();
      expect(ball.velocity.dy).toEqual(2);
    });

    it('should reverse velocity, if ball hits bottom wall', () => {
      const ball = new Ball(stubCanvas);
      ball.position.y = 595;
      ball.moveBall();
      expect(ball.velocity.dy).toEqual(-2);
    });

    it('should reverse velocity, if ball hits top wall', () => {
      const ball = new Ball(stubCanvas);
      ball.position.y = 5;
      ball.velocity.dy = -2;
      ball.moveBall();
      expect(ball.velocity.dy).toEqual(2);
    });
  });

  describe('Paddle collision', () => {
    it('reverses the horizontal velocity', () => {
      const ball = new Ball(stubCanvas);
      expect(ball.velocity.dx).toEqual(2);
      ball.paddleCollision();
      expect(ball.velocity.dx).toEqual(-2);
    });
  });
});
