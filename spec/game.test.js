const Game = require('../src/game')

describe('Game', function() {
  let pongGame

  beforeEach(() => {
    stubPaddle = {
      draw: jest.fn()
    };
    stubBall = {
      draw: jest.fn(),
      moveBall: jest.fn()
    };
    stubCanvas = {
      clear: jest.fn()
    };
    pongGame = new Game(stubPaddle, stubBall, stubCanvas);
  })

  test('calls draw on the paddle object', () => {
    pongGame.run()
    expect(pongGame.paddle.draw).toHaveBeenCalledTimes(1)
  })
})
