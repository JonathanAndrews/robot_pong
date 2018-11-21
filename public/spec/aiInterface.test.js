const AiInterface = require('../src/aiInterface');

describe('AI Interface', () => {
  let aiInterface;
  let model;
  let data;

  beforeEach(() => {
    data =  { 
        dataSync: jest.fn(() => [0.5,0.5,0.6]) 
    }
    model = {
        predict: jest.fn(() => data)
    }
    aiInterface = new AiInterface();
    tf = {
        loadModel: jest.fn(),
        tensor2d: jest.fn()
    }

  });
  
  describe('fetchModel', () => {
      it("doesn't make call to API when model has been retrieved", () => {
        aiInterface.model = "not zero"
        aiInterface.fetchModel()
        expect(tf.loadModel).toHaveBeenCalledTimes(0)
      })


      it("does make call to API when model has not been retrieved", () => {
        aiInterface.fetchModel()
        expect(tf.loadModel).toHaveBeenCalledTimes(1)
      })
    })
    
    describe('getMove', () => {
        it('calls predict on model', () => {
            aiInterface.model = model;
            let inputs = { some: "hash" };
            aiInterface.getMove(inputs);
            expect(model.predict).toBeCalledTimes(1);
        })

        it('calls dataSync prediciton', () => {
            aiInterface.model = model;
            let inputs = { some: "hash" };
            aiInterface.getMove(inputs);
            expect(data.dataSync).toBeCalledTimes(1);
        })

        it('returns a move', () => {
            aiInterface.model = model;
            let inputs = { some: "hash" };
            expect(aiInterface.getMove(inputs)).toEqual(1);
        })
    })
})
