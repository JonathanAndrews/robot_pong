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
      SPEED: 1.5,
    };
    stubAiPaddle = {
      draw: jest.fn(),
      DIMENSIONS: { height: 80, width: 10 },
      yPosition: 420,
      xPosition: 880,
      moveUp: jest.fn(),
      moveDown: jest.fn(),
      SPEED: 1.5,
      movePaddle: jest.fn(),
    };
    stubBall = {
      draw: jest.fn(),
      moveBall: jest.fn(),
      paddleCollision: jest.fn(),
      position: { x: 450, y: 300 },
      velocity: { dx: 2.2, dy: 2 },
      accelerationAct: jest.fn(),
      addGravity: jest.fn(),
      RADIUS: 5,
      reset: jest.fn(),
    };
    stubCanvas = {
      clear: jest.fn(),
      drawLines: jest.fn(),
      drawScores: jest.fn(),
      drawTime: jest.fn(),
      drawRobot: jest.fn(),
      drawGameOverPage: jest.fn(),
      width: 900,
      height: 600,
    };
    stubAiInterface = {
      getMove: jest.fn(),
      fetchModel: jest.fn(),
    };
    pongGame = new Game(stubPlayerPaddle, stubAiPaddle, stubBall, stubCanvas,
      stubAiInterface, 120000);
  });

  describe('default settings', () =>  {
    it('has a totalIntervals', () => {
      pongGameDefault = new Game(stubPlayerPaddle, stubAiPaddle, stubBall, stubCanvas, stubAiInterface)
      expect(pongGameDefault.totalIntervals).not.toBe(null)
    })
  })
  describe('game.run()', () => {
    it('calls checkPaddleCollision on the paddle object', () => {
      pongGame.checkPaddleCollision = jest.fn();
      pongGame.run();
      expect(pongGame.checkPaddleCollision).toHaveBeenCalledTimes(1);
    });

    it('tells the canvasDisplay to draw central lines', () => {
      pongGame.run();
      expect(pongGame.canvasDisplay.drawLines).toHaveBeenCalledTimes(1);
    });
    it('tells the canvasDisplay to draw central lines', () => {
      pongGame.ball.accelerationAct = jest.fn();
      pongGame.run();
      expect(pongGame.ball.accelerationAct).toHaveBeenCalledTimes(1);
    });

    describe('when interval remaining = 0', () => {
      it('calls all of the game over functions', () => {
        pongGame.isGameOver = jest.fn();
        pongGame.intervalRemaining = 0;
        pongGame.run();
        expect(pongGame.isGameOver).toHaveBeenCalledTimes(1);
        expect(stubCanvas.clear).toHaveBeenCalledTimes(1);
        expect(stubCanvas.drawGameOverPage).toHaveBeenCalledTimes(1);
      });
    });

    describe('when interval remaining < 0 ', () => {
      it('does nothing', () => {
        pongGame.isGameOver = jest.fn();
        pongGame.intervalRemaining = -1;
        pongGame.run();
        expect(pongGame.isGameOver).toHaveBeenCalledTimes(0)
      });
    });
  });

  describe('setDifficulty', () => {
    it('should set current_model to level', () => {
      pongGame.aiInterface.fetchModel = jest.fn();
      pongGame.setDifficulty(3);
      expect(pongGame.aiInterface.fetchModel).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkPaddleCollision', () => {
    it('should call paddleCollision method if collision with PlayerPaddle', () => {
      pongGame.ball.position = { x: 20, y: 420 };
      pongGame.ball.velocity.dx = -2;
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

  describe('getAIInputs', () => {
    it('should return a hash', () => {
      expect(pongGame.getAIInputs()).toBeInstanceOf(Object);
    });

    it('returns expected hash', () => {
      const aiInputs = pongGame.getAIInputs();
      expect(aiInputs['user-paddle-y']).toEqual(0.7);
      // expect(aiInputs['user-paddle-dy']).toEqual(1.5);
      expect(aiInputs['comp-paddle-y']).toEqual(0.7);
      // expect(aiInputs['comp-paddle-dy']).toEqual(1.5);
      expect(aiInputs['ball-position-x']).toEqual(0.5);
      expect(aiInputs['ball-position-y']).toEqual(0.5);
      expect(aiInputs['ball-velocity-dx']).toEqual(1);
      expect(aiInputs['ball-velocity-dy']).toBeCloseTo(0.9, 1);
      // expect(aiInputs['time-remaining']).toEqual(120000);
      expect(aiInputs.score).toEqual(0);
    });
  });

  describe('keyDownHandler', () => {
    it('should change upButton to true if keyCode is 87', () => {
      const mockE = {
        keyCode: 87,
      };
      expect(pongGame.upButton).toEqual(false);
      pongGame.keyDownHandler(mockE);
      expect(pongGame.upButton).toEqual(true);
    });

    it('should change downButton to true if keyCode is 83', () => {
      const mockE = {
        keyCode: 83,
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
    it('should change upButton to true if keyCode is 87', () => {
      const mockE = {
        keyCode: 87,
      };
      pongGame.upButton = true;
      expect(pongGame.upButton).toEqual(true);
      pongGame.keyUpHandler(mockE);
      expect(pongGame.upButton).toEqual(false);
    });

    it('should change downButton to true if keyCode is 83', () => {
      const mockE = {
        keyCode: 83,
      };
      pongGame.downButton = true;
      expect(pongGame.downButton).toEqual(true);
      pongGame.keyUpHandler(mockE);
      expect(pongGame.downButton).toEqual(false);
    });

    it('should change gravity to true if keyCode is 71 and gravity is false', () => {
      const mockE = {
        keyCode: 71,
      };
      pongGame.gravity = false;
      expect(pongGame.gravity).toEqual(false);
      pongGame.keyUpHandler(mockE);
      expect(pongGame.gravity).toEqual(true);
    });

    it('should change gravity to true if keyCode is 71 and gravity is true', () => {
      const mockE = {
        keyCode: 71,
      };
      pongGame.gravity = true;
      expect(pongGame.gravity).toEqual(true);
      pongGame.keyUpHandler(mockE);
      expect(pongGame.gravity).toEqual(false);
    });
    it('shold do nothing otherwise', () => {
      const mockE = {
        keyCode: 1171,
      };
      expect(pongGame.keyUpHandler(mockE)).toBe(undefined)
    })
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
      pongGame.gameOver = false;
      pongGame.intervalRemaining = 1;
      pongGame.isGameOver();
      expect(pongGame.gameOver).toEqual(false);
    });

    it('should be true when number of intervals is 0 or negative', () => {
      pongGame.gameOver = false;
      pongGame.intervalRemaining = 0;
      pongGame.run();
      expect(pongGame.gameOver).toEqual(true);
    });
  });

  describe('addGravity', () => {
    it('sets game gravity to true', () => {
      expect(pongGame.gravity).toEqual(false);
      pongGame.addGravity();
      expect(pongGame.gravity).toEqual(true);
    });
  });

  describe('removeGravity', () => {
    it('sets game gravity to false', () => {
      pongGame.gravity = true;
      pongGame.removeGravity();
      expect(pongGame.gravity).toEqual(false);
    });
  });
});
