const AiInterface = function AiInterface(network) {
  this.network = network
}

AiInterface.prototype.getMove = function getMove(hash_input) {
    options = [-1, 0, 1]
    return options[Math.floor(Math.random() * options.length)]
}

AiInterface.prototype.getComputedMove = function getComputedMove(hash_input) {
  this.network.computeMove(hash_input)
}

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
    module.exports = AiInterface;
  }
