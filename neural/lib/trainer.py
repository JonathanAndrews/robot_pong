import random
import numpy as np

class Trainer:
    '''The trainer of the neural network, using the game created'''

    def __init__(self, game, session, memory, network, max_epsilon, min_epsilon, epsilon_decay, gamma):
        self.game = game
        self.session = session
        self.memory = memory
        self.network = network
        self.max_epsilon = max_epsilon
        self.min_epsilon = min_epsilon
        self.epsilon_decay = epsilon_decay
        self.gamma = gamma

    
