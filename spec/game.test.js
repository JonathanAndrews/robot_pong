const Game = require('../src/game');

describe('Game', () => {
  let pongGame;
  let stubPaddle;
  let stubBall;
  let stubCanvas;

  beforeEach(() => {
    stubPaddle = {
      draw: jest.fn(),
    };
    stubBall = {
      draw: jest.fn(),
      moveBall: jest.fn(),
      paddleCollision: jest.fn()
    };
    stubCanvas = {
      clear: jest.fn(),
    };
    pongGame = new Game(stubPaddle, stubBall, stubCanvas);
  });

  it('calls draw on the paddle object', () => {
    pongGame.run();
    expect(pongGame.paddle.draw).toHaveBeenCalledTimes(1);
  });

  describe('checkPaddleCollision', () => {
    it('should call paddleCollision method if collision', () => {
      pongGame.checkPaddleCollision()
      expect(pongGame.ball.paddleCollision).toHaveBeenCalledTimes(1)
    })

    it('should not call paddleCollision method if no collision', () => {
      pongGame.checkPaddleCollision()
      expect(pongGame.ball.paddleCollision).toHaveBeenCalledTimes(0)
    })
  })
});
