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
      yPosition: 420
    };
    stubBall = {
      draw: jest.fn(),
      moveBall: jest.fn(),
      paddleCollision: jest.fn(),
      position: { x: 450, y: 300 }

    };
    stubCanvas = {
      clear: jest.fn(),
    };
    pongGame = new Game(stubPaddle, stubBall, stubCanvas);
  });

  it('calls checkPaddleCollision on the paddle object', () => {
    pongGame.checkPaddleCollision = jest.fn()
    pongGame.run();
    expect(pongGame.checkPaddleCollision).toHaveBeenCalledTimes(1);
  });

  describe('checkPaddleCollision', () => {
    it('should call paddleCollision method if collision', () => {
      pongGame.ball.position = { x: 20, y: 420 }
      pongGame.checkPaddleCollision()
      expect(pongGame.ball.paddleCollision).toHaveBeenCalledTimes(1)
    })

    it('should not call paddleCollision method if no collision', () => {
      pongGame.checkPaddleCollision()
      expect(pongGame.ball.paddleCollision).toHaveBeenCalledTimes(0)
    })
  })
});
