const AiInterface = require('../src/aiInterface');

describe('AI Interface', () => {
  let aiInterface;

  beforeEach(() => {
    aiInterface = new AiInterface();
  });

  describe('getMove', () => {
    it('takes a hash and returns an Integer', () => {
      const inputs = { some: 'hash' };
      expect((aiInterface.getMove(inputs) === (1 || 0 || -1))).toTrue;
    });
  });
});
