const Ball = require('../src/ball');

describe('Ball', () => {
  let stubContext;
  let stubCanvas;
  let ball;
  let PADDLEHEIGHT;
  let audio;
  let paddleSound;
  let wallSound;
  let goalSound;

  beforeEach(() => {
    paddleSound = { play: jest.fn() };
    wallSound = { play: jest.fn() };
    goalSound = { play: jest.fn() };
    audio = {
      audioPaddle: paddleSound,
      audioWall: wallSound,
      audioGoal: goalSound,
    };
    stubContext = {
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
    };
    stubCanvas = {
      getContext: jest.fn(() => stubContext),
    };
    ball = new Ball(stubCanvas, audio);
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
    dx = ball.velocity.dx;
    dy = ball.velocity.dy;
    expect(ball.position).toEqual({ x: 450 + dx, y: 300 + dy });
  });

  describe('Wall collision', () => {
    it('should not reverse vertical velocity, if ball does not hit wall', () => {
      velocityY = ball.velocity.dy;
      ball.moveBall();
      expect(ball.velocity.dy).toEqual(velocityY);
    });

    it('should reverse velocity, if ball hits bottom wall', () => {
      ball.position.y = 595;
      velocityY = ball.velocity.dy;
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
      velocityY = ball.velocity.dy;
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
      initialVel = ball.velocity.dy;
      ball.accelerationAct(true);
      expect(ball.velocity.dy).toEqual(initialVel + ball.acceleration.ddy);
    });

    it('doesnt change velocity when passed false', () => {
      initialVel = ball.velocity.dy;
      ball.accelerationAct(false);
      expect(ball.velocity.dy).toEqual(initialVel);
    });
  });

  describe('Audio Effects', () => {
    it('Paddle Collision plays BouncePaddle sound', () => {
      velocityY = ball.velocity.dy;
      expect(paddleSound.play).toHaveBeenCalledTimes(0);
      ball.paddleCollision(12, PADDLEHEIGHT);
      expect(paddleSound.play).toHaveBeenCalledTimes(1);
    });

    it('Paddle Collision plays BounceWall sound', () => {
      ball.position.y = 595;
      expect(wallSound.play).toHaveBeenCalledTimes(0);
      ball.moveBall();
      expect(wallSound.play).toHaveBeenCalledTimes(1);
    });

    it('Paddle Collision plays GoalSound sound', () => {
      expect(goalSound.play).toHaveBeenCalledTimes(0);
      ball.reset();
      expect(goalSound.play).toHaveBeenCalledTimes(1);
    });
  });
});
