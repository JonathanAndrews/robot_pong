const Game = require('../src/game');

describe('Game', () => {
  let pongGame;
  let stubPlayerPaddle;
  let stubAiPaddle;
  let stubBall;
  let stubCanvas;

  beforeEach(() => {
    stubPlayerPaddle = {
      draw: jest.fn(),
      DIMENSIONS: { height: 80, width: 10 },
      yPosition: 420,
      xPosition: 10,
      moveUp: jest.fn(),
      moveDown: jest.fn(),
    };
    stubAiPaddle = {
      draw: jest.fn(),
      DIMENSIONS: { height: 80, width: 10 },
      yPosition: 420,
      xPosition: 880,
      moveUp: jest.fn(),
      moveDown: jest.fn(),
    };
    stubBall = {
      draw: jest.fn(),
      moveBall: jest.fn(),
      paddleCollision: jest.fn(),
      position: { x: 450, y: 300 },
      RADIUS: 5,
      reset: jest.fn(),
    };
    stubCanvas = {
      clear: jest.fn(),
      width: 900,
    };
    pongGame = new Game(120000, stubPlayerPaddle, stubAiPaddle, stubBall, stubCanvas);
  });

  it('calls checkPaddleCollision on the paddle object', () => {
    pongGame.checkPaddleCollision = jest.fn();
    pongGame.run();
    expect(pongGame.checkPaddleCollision).toHaveBeenCalledTimes(1);
  });

  describe('checkPaddleCollision', () => {
    it('should call paddleCollision method if collision with PlayerPaddle', () => {
      pongGame.ball.position = { x: 20, y: 420 };
      pongGame.checkPaddleCollision();
      expect(pongGame.ball.paddleCollision).toHaveBeenCalledTimes(1);
    });

    it('should call paddleCollision method if collision with AiPaddle', () => {
      pongGame.ball.position = { x: 880, y: 420 };
      pongGame.checkPaddleCollision();
      expect(pongGame.ball.paddleCollision).toHaveBeenCalledTimes(1);
    });

    it('should not call paddleCollision method if no collision', () => {
      pongGame.checkPaddleCollision();
      expect(pongGame.ball.paddleCollision).toHaveBeenCalledTimes(0);
    });
  });

  describe('keyDownHandler', () => {
    it('should change upButton to true if keyCode is 38', () => {
      const mockE = {
        keyCode: 38,
      };
      expect(pongGame.upButton).toEqual(false);
      pongGame.keyDownHandler(mockE);
      expect(pongGame.upButton).toEqual(true);
    });

    it('should change downButton to true if keyCode is 40', () => {
      const mockE = {
        keyCode: 40,
      };
      expect(pongGame.downButton).toEqual(false);
      pongGame.keyDownHandler(mockE);
      expect(pongGame.downButton).toEqual(true);
    });

    it('nothing to happen if passed keycode 39', () => {
      const mockE = {
        keyCode: 39,
      };
      expect(pongGame.downButton).toEqual(false);
      pongGame.keyDownHandler(mockE);
      expect(pongGame.downButton).toEqual(false);
    });
  });

  describe('keyUpHandler', () => {
    it('should change upButton to true if keyCode is 38', () => {
      const mockE = {
        keyCode: 38,
      };
      pongGame.upButton = true;
      expect(pongGame.upButton).toEqual(true);
      pongGame.keyUpHandler(mockE);
      expect(pongGame.upButton).toEqual(false);
    });

    it('should change downButton to true if keyCode is 40', () => {
      const mockE = {
        keyCode: 40,
      };
      pongGame.downButton = true;
      expect(pongGame.downButton).toEqual(true);
      pongGame.keyUpHandler(mockE);
      expect(pongGame.downButton).toEqual(false);
    });

    it('should change downButton to true if keyCode is 39', () => {
      const mockE = {
        keyCode: 39,
      };
      pongGame.downButton = true;
      expect(pongGame.downButton).toEqual(true);
      pongGame.keyUpHandler(mockE);
      expect(pongGame.downButton).toEqual(true);
    });
  });

  describe('checkForGoal', () => {
    it('should increase ai score by one if x-position < -BallRadius', () => {
      pongGame.ball.position.x = -10;
      pongGame.checkForGoal();
      expect(pongGame.score).toEqual([0, 1]);
    });

    it('should increase player score by one if x-position > CanvasWidth + BallRadius', () => {
      pongGame.ball.position.x = 910;
      pongGame.checkForGoal();
      expect(pongGame.score).toEqual([1, 0]);
    });

    it('if player scores, tells the ball to reset position', () => {
      pongGame.ball.position.x = 910;
      pongGame.checkForGoal();
      expect(pongGame.ball.reset).toHaveBeenCalledTimes(1);
    });

    it('if ai scores, tells the ball to reset position', () => {
      pongGame.ball.position.x = -10;
      pongGame.checkForGoal();
      expect(pongGame.ball.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe('isGameOver', () => {
    it('should be false when number of intervals is positive', () => {
      pongGame.run();
      expect(pongGame.gameOver).toEqual(false);
    })

    it('should be true when number of intervals is 0 or negative', () => {
      pongGame.intervalRemaining = 0
      pongGame.run()
      expect(pongGame.gameOver).toEqual(true);
    })
  })
});
