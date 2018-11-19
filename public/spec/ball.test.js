const Ball = require('../src/ball');

describe('Ball', () => {
  let stubContext;
  let stubCanvas;
  let ball;
  let PADDLEHEIGHT;

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
    ball = new Ball(stubCanvas);
    PADDLEHEIGHT = 10;
  });

  it('calls beginPath on ctx', () => {
    ball.draw();
    expect(stubContext.beginPath).toHaveBeenCalledTimes(1);
    expect(stubContext.arc).toHaveBeenCalledTimes(1);
    expect(stubContext.fill).toHaveBeenCalledTimes(1);
    expect(stubContext.closePath).toHaveBeenCalledTimes(1);
    expect(stubContext.fillStyle).toEqual('#FFFFFF');
  });

  it('should change position', () => {
    ball.moveBall();
    dx = ball.velocity.dx
    dy = ball.velocity.dy
    expect(ball.position).toEqual({ x: 450 + dx, y: 300 + dy });
  });

  describe('Wall collision', () => {
    it('should not reverse vertical velocity, if ball does not hit wall', () => {
      velocityY = ball.velocity.dy
      ball.moveBall();
      expect(ball.velocity.dy).toEqual(velocityY);
    });

    it('should reverse velocity, if ball hits bottom wall', () => {
      ball.position.y = 595;
      velocityY = ball.velocity.dy
      ball.moveBall();
      expect(ball.velocity.dy).toEqual(-velocityY);
    });

    it('should reverse velocity, if ball hits top wall', () => {
      ball.position.y = 5;
      ball.velocity.dy = -2;
      ball.moveBall();
      expect(ball.velocity.dy).toEqual(2);
    });
  });

  describe('Paddle collision', () => {
    it('reverses the horizontal velocity', () => {
      velocityY = ball.velocity.dy
      expect(ball.velocity.dx).toEqual(velocityY);
      ball.paddleCollision(12, PADDLEHEIGHT);
      expect(ball.velocity.dx).toEqual(-velocityY);
    });

    it('changes the vertical velocity', () => {
      ball.position.y = 18;
      ball.velocity.dy = 2;
      expect(ball.velocity.dy).toEqual(2);
      ball.paddleCollision(12, PADDLEHEIGHT);
      expect(ball.velocity.dy).toBeCloseTo(2.4, 1);
    });

    it('changes the vertical velocity in a different way', () => {
      ball.position.y = 18;
      ball.velocity.dy = 2;
      expect(ball.velocity.dy).toEqual(2);
      ball.paddleCollision(16, PADDLEHEIGHT);
      expect(ball.velocity.dy).toBeCloseTo(-7.2, 1);
    });
  });

  describe('Reset', () => {
    it('resets ball to start position', () => {
      ball.position = { x: 20, y: 50 };
      ball.reset();
      expect(ball.position).toEqual({ x: 450, y: 300 });
    });

    it('resets ball velocity', () => {
      ball.velocity = { dx: 20, dy: 50 };
      ball.reset();
      expect(ball.velocity).toEqual(ball.initialVelocity);
    });
  });

  describe('accelerationAct', () => {
    it('increased y-velocity by y-acceleration when passed true', () => {
      initial_vel = ball.velocity.dy;
      ball.accelerationAct(true);
      expect(ball.velocity.dy).toEqual(initial_vel + ball.acceleration.ddy)
    })

    it('doesnt change velocity when passed false', () => {
      initial_vel = ball.velocity.dy;
      ball.accelerationAct(false);
      expect(ball.velocity.dy).toEqual(initial_vel)
    })
  })
});
