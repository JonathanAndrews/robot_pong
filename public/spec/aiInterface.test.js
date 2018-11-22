const AiInterface = require('../src/aiInterface');

describe('AI Interface', () => {
  let aiInterface;
  let allModels;
  let data;

  beforeEach(() => {
    data =  {
        dataSync: jest.fn(() => [0.5,0.5,0.6])
    }
    model = {
        predict: jest.fn(() => data)
    }
    allModels = {
      7: model,
    }
    aiInterface = new AiInterface();
    tf = {
        loadModel: jest.fn(),
        tensor2d: jest.fn()
    }


  });

  describe('fetchModel', () => {
      it("doesn't make call to API when model has been retrieved", () => {
        aiInterface.model[7] = true;
        aiInterface.fetchModel(7);
        expect(tf.loadModel).toHaveBeenCalledTimes(0)
      })


      it("does make call to API when model has not been retrieved", () => {
        aiInterface.fetchModel(8)
        expect(tf.loadModel).toHaveBeenCalledTimes(1)
      })
    })

    describe('getMove', () => {
        it('calls predict on model', () => {
          aiInterface._makePredictions = jest.fn(() => [1,2,3]);
          aiInterface.model = allModels;
          let inputs = { some: "hash" };
          aiInterface.getMove(7, inputs);
          expect(aiInterface._makePredictions).toHaveBeenCalledTimes(1);
        })

        it('calls dataSync prediciton', () => {
          aiInterface.model = allModels;
          let inputs = { some: "hash" };
          aiInterface.getMove(7, inputs);
          expect(data.dataSync).toHaveBeenCalledTimes(1);
        })

        it('returns a move', () => {
          aiInterface.model = allModels;
          let inputs = { some: "hash" };
          expect(aiInterface.getMove(7, inputs)).toEqual(1);
        })
    })
})
