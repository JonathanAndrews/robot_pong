const AiInterface = function AiInterface() {
  this.MODELURL = 'https://burninglake.herokuapp.com/model';
  this.model = false;
  this.fetchModel();
}

AiInterface.prototype.fetchModel = async function fetchModel() {
  if (!this.model) this.model = await tf.loadModel(this.MODELURL);
}

AiInterface.prototype.getMove = function getMove(hash_input) {
  let ai_input_array = this._ai_input_array(hash_input);
  let move_rewards = this._make_predictions(ai_input_array);
  return this._chooses_best_move(move_rewards);
}

AiInterface.prototype._ai_input_array = function _ai_input_array(hash_input) {
  let keys = Object.keys(hash_input);
  return keys.map(function(k) { return hash_input[k]});
}

AiInterface.prototype._make_predictions = function _make_predictions(inputs) {
  let tf_ai_inputs = tf.tensor2d([inputs]);
  return this.model.predict(tf_ai_inputs).dataSync();
}

AiInterface.prototype._chooses_best_move = function _chooses_best_move(inputs) {
  let index_of_move = inputs.indexOf(Math.max(...inputs)) ;
  let move = index_of_move - 1;
  return move;
}

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
    module.exports = AiInterface;
  }
