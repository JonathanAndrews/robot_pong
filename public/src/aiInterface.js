const AiInterface = function AiInterface() {
  this.MODELURL = 'https://burninglake.herokuapp.com/model/version_'
  this.model = {};
}

AiInterface.prototype.fetchModel = async function fetchModel(version) {
  if (!this.model[version]) {
    console.log('THIS HAS BEEN CALLED')
    this.model[version] = await tf.loadModel(this.MODELURL + version);
    console.log(version)
  }
}

AiInterface.prototype.getMove = function getMove(version, hash_input) {
  console.log(version)
  let ai_input_array = this._ai_input_array(hash_input);
  let move_rewards = this._make_predictions(version, ai_input_array);
  return this._chooses_best_move(move_rewards);
}

AiInterface.prototype._ai_input_array = function _ai_input_array(hash_input) {
  let keys = Object.keys(hash_input);
  a = keys.map(function(k) { return hash_input[k] });
  return a

}

AiInterface.prototype._make_predictions = function _make_predictions(version, inputs) {
  console.log(inputs)
  console.log(version)
  let tf_ai_inputs = tf.tensor2d([inputs]);
  return this.model[version].predict(tf_ai_inputs).dataSync();
}

AiInterface.prototype._chooses_best_move = function _chooses_best_move(inputs) {
  let index_of_move = inputs.indexOf(Math.max(...inputs)) ;
  let move = index_of_move - 1;
  return move;
}

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
    module.exports = AiInterface;
  }
