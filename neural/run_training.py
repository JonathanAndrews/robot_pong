import math
import tensorflow as tf
import numpy as np
import time
from lib.network import Network
from lib.game import Game
from lib.memory import Memory
from lib.trainer import Trainer

HIDDEN_LAYER_SIZE = 100
NO_HIDDEN_LAYERS = 3
GAME_LENGTH = 120000
GAME_STEP_TIME = 20
GAMES_PER_TRAINING_SESSION = 10
MEMORY_SIZE = 60000
MAX_EPSILON = 0.999
MIN_EPSILON = 0.001
EPSILON_DECAY = 0.0001
GAMMA = 0.999

def main():
    with tf.Session() as session:
        memory_bank = Memory(MEMORY_SIZE)
        pong_game = Game(GAME_LENGTH, GAME_STEP_TIME)

        initial_user = Network(3, 10, hidden_layer_size=HIDDEN_LAYER_SIZE, no_hidden_layers=NO_HIDDEN_LAYERS)
        initial_competitor = Network(3, 10, hidden_layer_size=HIDDEN_LAYER_SIZE, no_hidden_layers=NO_HIDDEN_LAYERS)

        trainer = Trainer(pong_game, session, memory_bank, initial_user, initial_competitor, MAX_EPSILON, MIN_EPSILON, EPSILON_DECAY, GAMMA)

        session.run(initial_user.variable_initializer)
        session.run(initial_competitor.variable_initializer)

        start_time = time.time()
        for _ in range(GAMES_PER_TRAINING_SESSION):
            trainer.run_game()
            print('Finished a game')

        print("Time taken: %s", time.time() - start_time)
        initial_user.save_network(session, './version_0/')

if __name__ == '__main__':
    print('Calling main function')
    main()
