const AiInterface = function AiInterface(network) {
  this.network = network
}

let model = 0;

const modelURL = 'https://burninglake.herokuapp.com/model'

AiInterface.prototype.fetchModel = async function fetchModel(modelURL) {
  if (model === 0) model = await tf.loadModel(modelURL);
}


AiInterface.prototype.getMove = function getMove(hash_input) {
  this.fetchModel(modelURL);
  // console.log(hash_input);
  let keys = Object.keys(hash_input)
  let ai_input_array = keys.map(function(v) { return hash_input[v]})
  // console.log(keys);
  // console.log(ai_inputs);
  x = tf.tensor2d([ai_input_array])
  // console.log(x);
  y = model.predict(x).dataSync();
  console.log(y);


  // //
  //     options = [-1, 0, 1]
  // return options[Math.floor(Math.random() * options.length)]
}

AiInterface.prototype.getComputedMove = function getComputedMove(hash_input) {
  this.network.computeMove(hash_input)
}

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
    module.exports = AiInterface;
  }
