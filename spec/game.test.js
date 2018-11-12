const Game = require('../src/game')

describe('Game', function() {
  let pongGame

  beforeEach(() => {
    stubPaddle = {
      draw: jest.fn()
    };
    stubBall = {
      draw: jest.fn()
    };
    pongGame = new Game(stubPaddle, stubBall);
  })

  test('calls draw on the paddle object', () => {
    pongGame.run()
    expect(pongGame.paddle.draw).toHaveBeenCalledTimes(1)
  })
})
