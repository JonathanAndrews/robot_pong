const AiInterface = function AiInterface(network) {
  this.network = network
  this.MODELURL = 'https://burninglake.herokuapp.com/model/version_'
  this.model = {};
  this.current_model = null;
}

AiInterface.prototype.fetchModel = async function fetchModel(version) {
  if (!this.model.version) {
    this.model.version = await tf.loadModel(this.MODELURL + version);
  }
  this.current_model = this.model.version
}

AiInterface.prototype.getMove = function getMove(hash_input) {
  let ai_input_array = this._ai_input_array(hash_input);
  let move_rewards = this._make_predictions(ai_input_array);
  return this._chooses_best_move(move_rewards);
}

AiInterface.prototype._ai_input_array = function _ai_input_array(hash_input) {
  let keys = Object.keys(hash_input);
  return keys.map(function(k) { return hash_input[k] });
}

AiInterface.prototype._make_predictions = function _make_predictions(inputs) {
  let tf_ai_inputs = tf.tensor2d([inputs]);
  return this.current_model.predict(tf_ai_inputs).dataSync();
}

AiInterface.prototype._chooses_best_move = function _chooses_best_move(inputs) {
  let index_of_move = inputs.indexOf(Math.max(...inputs)) ;
  let move = index_of_move - 1;
  return move;
}

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
    module.exports = AiInterface;
  }
