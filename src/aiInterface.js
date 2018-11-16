const AiInterface = function AiInterface() {

}

AiInterface.prototype.getMove = function getMove(hash_input) {
    options = [-1, 0, 1]
    return options[Math.floor(Math.random()*options.length)]
}

if (typeof module !== 'undefined' && Object.prototype.hasOwnProperty.call(module, 'exports')) {
    module.exports = AiInterface;
  }