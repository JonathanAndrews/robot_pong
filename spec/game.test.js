const Game = require('../src/game');

describe('Game', () => {
  let pongGame;
  let stubPaddle;
  let stubBall;
  let stubCanvas;

  beforeEach(() => {
    stubPaddle = {
      draw: jest.fn(),
      DIMENSIONS: { height: 80, width: 10 },
      yPosition: 420,
      xPosition: 20,
      moveUp: jest.fn(),
      moveDown: jest.fn()
    };
    stubBall = {
      draw: jest.fn(),
      moveBall: jest.fn(),
      paddleCollision: jest.fn(),
      position: { x: 450, y: 300 },
    };
    stubCanvas = {
      clear: jest.fn(),
    };
    pongGame = new Game(stubPaddle, stubPaddle, stubBall, stubCanvas);
  });

  it('calls checkPaddleCollision on the paddle object', () => {
    pongGame.checkPaddleCollision = jest.fn();
    pongGame.run();
    expect(pongGame.checkPaddleCollision).toHaveBeenCalledTimes(1);
  });

  describe('checkPaddleCollision', () => {
    it('should call paddleCollision method if collision', () => {
      pongGame.ball.position = { x: 20, y: 420 };
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
      mockE = {
        keyCode: 38
      }
      expect(pongGame.upButton).toEqual(false)
      pongGame.keyDownHandler(mockE)
      expect(pongGame.upButton).toEqual(true)
    })

    it('should change downButton to true if keyCode is 40', () => {
      mockE = {
        keyCode: 40
      }
      expect(pongGame.downButton).toEqual(false)
      pongGame.keyDownHandler(mockE)
      expect(pongGame.downButton).toEqual(true)
    })

    it('nothing to happen if passed keycode 39', () => {
      mockE = {
        keyCode: 39
      }
      expect(pongGame.downButton).toEqual(false)
      pongGame.keyDownHandler(mockE)
      expect(pongGame.downButton).toEqual(false)
    })
  })

  describe('keyUpHandler', () => {
    it('should change upButton to true if keyCode is 38', () => {
      mockE = {
        keyCode: 38
      }
      pongGame.upButton = true;
      expect(pongGame.upButton).toEqual(true)
      pongGame.keyUpHandler(mockE)
      expect(pongGame.upButton).toEqual(false)
    })

    it('should change downButton to true if keyCode is 40', () => {
      mockE = {
        keyCode: 40
      }
      pongGame.downButton = true;
      expect(pongGame.downButton).toEqual(true)
      pongGame.keyUpHandler(mockE)
      expect(pongGame.downButton).toEqual(false)
    })
  })
});
